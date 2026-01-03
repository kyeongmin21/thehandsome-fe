import {render, screen} from '@testing-library/react';
import UiTextarea from '@/components/ui/UiTextarea';

describe('UiTextarea', () => {
    test('label이 보임', () => {
        render(<UiTextarea label="내용"/>);
        expect(screen.getByText('내용')).toBeInTheDocument();
    });

    test('description이 있으면 보임', () => {
        render(
            <UiTextarea
                label="내용"
                description="상세 내용을 입력하세요"
            />
        );
        expect(screen.getByText('상세 내용을 입력하세요')).toBeInTheDocument();
    });

    test('textarea가 렌더링', () => {
        render(<UiTextarea label="내용"/>);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('height가 style로 적용', () => {
        render(<UiTextarea label="내용" height="300px"/>);
        expect(screen.getByRole('textbox')).toHaveStyle({height: '300px'});
    });
});
