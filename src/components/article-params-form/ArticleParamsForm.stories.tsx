import type { Meta, StoryObj } from '@storybook/react';
import { ArticleParamsForm } from './ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

const meta: Meta<typeof ArticleParamsForm> = {
	title: 'Components/ArticleParamsForm',
	component: ArticleParamsForm,
};

export default meta;
type Story = StoryObj<typeof ArticleParamsForm>;

export const SelectStory: Story = {
	render: () => (
		<ArticleParamsForm
			appliedSettings={defaultArticleState}
			onApply={(settings) => {
				console.log('Settings applied:', settings);
			}}
			onReset={() => {
				console.log('Reset clicked');
			}}
		/>
	),
};
