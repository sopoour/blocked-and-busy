import { getMedia } from './media';

const theme = {
  media: getMedia,
  colors: {
    bg: {
      soft: '#FDFBF3',
    },
    fg: {
      default: '#151203',
    },
  },
} as const;

export default theme;
