/*
format {
    type: 'string', 'number', 'image'
    notNull: bollean
    max: number
    min: number
}
*/
export function inputCheck(format, data, option = {}) {
  // console.log('format', format);
  // console.log('data', data);

  switch (format.type) {
    case 'string':
      if (format.notNull && !data) {
        return {
          status: 'Fail',
          msg: 'Field cannot be empty',
        };
      }
      //Check string?

      return {
        status: 'OK',
        data: data,
      };
    case 'number':
      if (format.notNull && !data) {
        return {
          status: 'Fail',
          msg: 'Field cannot be empty',
        };
      }
      let number = Number(data);
      if (String(number) !== String(data)) {
        console.log('string number:', String(number), 'data:', data);
        return {
          status: 'Fail',
          msg: 'Number Only',
        };
      }
      if (number > format.max || number < format.min) {
        return {
          status: 'Fail',
          msg: 'Number out of range',
        };
      }
      return {
        status: 'OK',
        data: Number(data),
      };
    case 'image':
      //todo
      return {
        status: 'OK',
        data: data,
      };
    case 'currency':
      if (format.notNull && !data) {
        return {
          status: 'Fail',
          msg: 'Field cannot be empty',
        };
      }
      if (number > format.max || number < format.min) {
        return {
          status: 'Fail',
          msg: 'Price out of range',
        };
      }
      return {
        status: 'OK',
        data: Number(data),
      };
    default:
      return {
        status: 'Fail',
        msg: 'Unkonw type for input check.',
      };
  }
}
