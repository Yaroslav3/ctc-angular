import {FirstPhotoBlog} from './FirstPhotoBlog.model';

export class Blog {
  id: number;
  name: string;
  author: string;
  createDate: Date;
  theme: string;
  description: string;
  firstPhotoBlog: FirstPhotoBlog;


  constructor(name: string, author: string, theme: string, description: string,
              id?: number, createDate?: Date, firstPhotoBlog?: FirstPhotoBlog) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.createDate = createDate;
    this.theme = theme;
    this.description = description;
    this.firstPhotoBlog = firstPhotoBlog;
  }
}
