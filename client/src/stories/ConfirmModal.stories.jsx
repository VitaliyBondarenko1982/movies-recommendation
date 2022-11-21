import React from 'react';

import { ConfirmModal } from '../components';

export default {
  title: 'ConfirmModal component',
  component: ConfirmModal,
};

const Template = (args) => <ConfirmModal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  open: true,
  url: 'http://localhost/recommend?title=my_movies&ids=232,434',
  title: 'My favourite movies',
  onClose: () => {}
};
