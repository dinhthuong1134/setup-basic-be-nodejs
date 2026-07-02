import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Cấu hình các quy tắc riêng của bạn
    rules: {
      'no-console': 'warn',           // Cảnh báo khi dùng console.log
      'prefer-const': 'error',        // Bắt buộc dùng const nếu biến không thay đổi
      '@typescript-eslint/no-explicit-any': 'warn', // Hạn chế dùng kiểu 'any'
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ]
    },
  },
  {
    // Chỉ định các file cần kiểm tra
    files: ['src/**/*.ts'],
    // Bỏ qua các thư mục không cần thiết
    ignores: ['node_modules/', 'dist/'],
  }
);