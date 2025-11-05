import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = ({
	appliedSettings,
	onApply,
	onReset,
}: {
	appliedSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
}) => {
	const [localSettings, setLocalSettings] =
		useState<ArticleStateType>(appliedSettings);
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({ isOpen, rootRef, onChange: () => setIsOpen(false) });

	// Открытие/закрытие сайдбара
	const handleToggle = () => {
		if (!isOpen) {
			// при открытии - сбрасываем локальные настройки в текущие применённые
			setLocalSettings(appliedSettings);
		}
		setIsOpen((prev) => !prev);
	};

	const handleChange = (key: keyof typeof localSettings, value: OptionType) => {
		setLocalSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleApply = () => {
		onApply(localSettings);
		setIsOpen(false);
	};

	const handleReset = () => {
		setLocalSettings({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
		onReset();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleApply();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<div className={styles.сontainer}>
						<Select
							title='Шрифт'
							selected={localSettings.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) => handleChange('fontFamilyOption', option)}
						/>
					</div>
					<div className={styles.сontainer}>
						<RadioGroup
							name={'font-size'}
							title='Размер шрифта'
							selected={localSettings.fontSizeOption}
							options={fontSizeOptions}
							onChange={(option) => handleChange('fontSizeOption', option)}
						/>
					</div>
					<div className={styles.сontainer}>
						<Select
							title='Цвет шрифта'
							selected={localSettings.fontColor}
							options={fontColors}
							onChange={(option) => handleChange('fontColor', option)}
						/>
					</div>
					<div className={styles.сontainer}>
						<Separator />
					</div>
					<div className={styles.сontainer}>
						<Select
							title='Цвет фона'
							selected={localSettings.backgroundColor}
							options={backgroundColors}
							onChange={(option) => handleChange('backgroundColor', option)}
						/>
					</div>
					<div className={styles.сontainer}>
						<Select
							title='Ширина контента'
							selected={localSettings.contentWidth}
							options={contentWidthArr}
							onChange={(option) => handleChange('contentWidth', option)}
						/>
					</div>
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
