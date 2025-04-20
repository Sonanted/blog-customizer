import clsx from 'clsx';
import { useState } from 'react';

import {
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
	ArticleOption,
} from '../../constants/';

import {
	ArrowButton,
	Button,
	RadioGroup,
	Separator,
	Text,
	Select,
} from '../../ui';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [articleFormState, setArticleFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleOptionChange = (option: string) => (value: OptionType) => {
		setArticleFormState((prevState) => ({
			...prevState,
			[option]: value,
		}));
	};

	const handleReset = () => {
		setArticleFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setArticleState(articleFormState);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} uppercase={true} weight={800}>
						Задавайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleFormState.fontFamilyOption}
						onChange={handleOptionChange(ArticleOption.fontFamily)}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={articleFormState.fontSizeOption}
						onChange={handleOptionChange(ArticleOption.fontSize)}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={articleFormState.fontColor}
						onChange={handleOptionChange(ArticleOption.fontColor)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={articleFormState.backgroundColor}
						onChange={handleOptionChange(ArticleOption.backgroundColor)}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleFormState.contentWidth}
						onChange={handleOptionChange(ArticleOption.contentWidth)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
