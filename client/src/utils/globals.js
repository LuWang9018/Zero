import logoPath from './img/Logo.svg';
const rootPath = 'localhost:3000';
export const imageNotFount =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png';

export const theme = {
  colors: {
    topBar: {
      background: '#357997',
    },
  },
  logo: {
    width: 124,
    topBarSource: logoPath,
    contextualSaveBarSource: logoPath,
    url: rootPath,
    accessibilityLabel: 'Project Zero',
  },
};
