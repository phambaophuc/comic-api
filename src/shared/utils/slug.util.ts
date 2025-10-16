import slugify from 'slugify';

export function generateSlug(title: string): string {
  return slugify(title, {
    lower: true, // viết thường
    strict: true, // bỏ ký tự đặc biệt
    locale: 'vi', // hỗ trợ tiếng Việt
    trim: true,
  });
}
