export default class CategoryDTO {
    constructor(category) {
      this.name = category.title;
      this.isVisible = category.description;
    }
  }
