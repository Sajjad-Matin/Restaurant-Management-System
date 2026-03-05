import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // ─── CATEGORIES ───────────────────────────────────────────

  async getCategories() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: { select: { menuItems: true } },
      },
    });
  }

  async createCategory(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    await this.findCategoryOrThrow(id);
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async deleteCategory(id: string) {
    await this.findCategoryOrThrow(id);
    return this.prisma.category.update({
      where: { id },
      data: { isActive: false }, // soft delete
    });
  }

  // ─── MENU ITEMS ───────────────────────────────────────────

  async getMenuItems(categoryId?: string) {
    return this.prisma.menuItem.findMany({
      where: {
        isAvailable: true,
        ...(categoryId ? { categoryId } : {}),
      },
      orderBy: { sortOrder: 'asc' },
      include: {
        category: { select: { id: true, name: true } },
        variants: {
          where: { isAvailable: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  async getMenuItem(id: string) {
    const item = await this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true } },
        variants: {
          where: { isAvailable: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  async getFeaturedItems() {
    return this.prisma.menuItem.findMany({
      where: { isFeatured: true, isAvailable: true },
      include: {
        category: { select: { id: true, name: true } },
        variants: {
          where: { isAvailable: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  async createMenuItem(dto: CreateMenuItemDto) {
    const { variants, ...itemData } = dto;
    return this.prisma.menuItem.create({
      data: {
        ...itemData,
        variants: variants
          ? { create: variants }
          : undefined,
      },
      include: { variants: true },
    });
  }

  async updateMenuItem(id: string, dto: UpdateMenuItemDto) {
    await this.findMenuItemOrThrow(id);
    const { variants, ...itemData } = dto;
    return this.prisma.menuItem.update({
      where: { id },
      data: itemData,
      include: { variants: true },
    });
  }

  async deleteMenuItem(id: string) {
    await this.findMenuItemOrThrow(id);
    return this.prisma.menuItem.update({
      where: { id },
      data: { isAvailable: false }, // soft delete
    });
  }

  // ─── HELPERS ──────────────────────────────────────────────

  private async findCategoryOrThrow(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  private async findMenuItemOrThrow(id: string) {
    const item = await this.prisma.menuItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }
}