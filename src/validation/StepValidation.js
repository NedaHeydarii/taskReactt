export const stepSchema = {
  name: {
    required: 'نام مرحله الزامی است',
    minLength: {
      value: 2,
      message: 'نام مرحله باید حداقل ۲ کاراکتر باشد'
    },
    maxLength: {
      value: 50,
      message: 'نام مرحله نمی‌تواند بیشتر از ۵۰ کاراکتر باشد'
    }
  }
}