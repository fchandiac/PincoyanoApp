import React from 'react'

const subcategories = require('@/services/subcategories')

export default function useSubcategories() {

  const create = async (name, description, categoryId) => {
    const subcategory = await subcategories.create(name, description, categoryId)
    return subcategory
  }

  const findAll = async () => {
    const subcategory = await subcategories.findAll()
    return subcategory
  }

  const findAllByCategory = async (categoryId) => {
    const subcategory = await subcategories.findAllByCategory(categoryId)
    return subcategory
  }

  const findOneById = async (id) => {
    const subcategory = await subcategories.findOneById(id)
    return subcategory
  }

  const update = async (id, name, description, categoryId) => {
    const subcategory = await subcategories.update(id, name, description, categoryId)
    return
  }

  const destroy = async (id) => {
    const subcategory = await subcategories.destroy(id)
    return subcategory
  }

  const findAllToGrid = async () => {
    const subcategory = await subcategories.findAll()
    const formatted = subcategory.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      categoryName: s.Category == null ? '': s.Category.name,
      category: s.Category == null ? null: {id: s.Category.id, key: s.Category.id, name: s.Category.name}
    }))
    return formatted
  }

  const findAllToAutocomplete = async () => {
    const subcategory = await subcategories.findAll()
    const formatted = subcategory.map((s) => ({
      id: s.id,
      key: s.id,
      name: s.name,
    }))
    return formatted
  }

  const findOneByName = async (name) => {
    const subcategory = await subcategories.findOneByName(name)
    return subcategory
  }

  const noSubcategory = async () => {
    const subcategory = await subcategories.findOneByName('SIN SUBCATEGORÍA')
    return subcategory
  }

  return {
    create,
    findAll,
    findOneById,
    update,
    destroy,
    findAllToGrid,
    findAllToAutocomplete,
    findOneByName,
    noSubcategory,
    findAllByCategory
  }

   
}
