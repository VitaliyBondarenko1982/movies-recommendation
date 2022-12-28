import React from 'react';

import { MovieCard } from '../components';
import movies from './stub';

export default {
  title: 'Card/Movie card',
  component: MovieCard,
};

const Template = args => <MovieCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  movie: movies[0],
};
