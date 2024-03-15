const categories = require("@/services/categories");

export default function useCategories() {
  const create = async (name, description) => {
    const category = await categories.create(name, description);
    return category;
  };

  const findAll = async () => {
    const category = await categories.findAll();
    return category;
  };

  const findOneById = async (id) => {
    const category = await categories.findOneById(id);
    return category;
  };

  const update = async (id, name, description) => {
    const category = await categories.update(id, name, description);
    return category;
  };

  const destroy = async (id) => {
    const category = await categories.destroy(id);
    return category;
  };

  const findAllToAutocomplete = async () => {
    const category = await categories.findAll();
    const formatted = category.map((c) => ({
      id: c.id,
      key: c.id,
      name: c.name,
    }));
    return formatted;
  };

  const findAllToGrid = async () => {
    const category = await categories.findAll();
    const formatted = category.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
    }));
    return formatted;
  };

  const findOneByName = async (name) => {
    const category = await categories.findOneByName(name);
    return category;
  };

  const noCategory =  async () => {
    const category = await categories.findOneByName('SIN CATEGORÍA');
    return category;
  }

  return {
    create,
    findAll,
    findOneById,
    update,
    destroy,
    findAllToAutocomplete,
    findAllToGrid,
    findOneByName,
    noCategory
  };
}
