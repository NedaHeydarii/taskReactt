export const fieldSchema = {
  label: {
    required: 'لیبل فیلد الزامی است',
    minLength: {
      value: 2,
      message: 'لیبل فیلد باید حداقل ۲ کاراکتر باشد'
    },
    maxLength: {
      value: 50,
      message: 'لیبل فیلد نمی‌تواند بیشتر از ۵۰ کاراکتر باشد'
    }
  },
  placeholder: {
    required: 'Placeholder فیلد الزامی است',
    minLength: {
      value: 2,
      message: 'Placeholder فیلد باید حداقل ۲ کاراکتر باشد'
    },
    maxLength: {
      value: 100,
      message: 'Placeholder فیلد نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد'
    }
  },
  fieldType: {
    required: 'نوع فیلد الزامی است'
  }
}