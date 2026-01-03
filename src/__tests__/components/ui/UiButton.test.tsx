import {render, screen, fireEvent} from '@testing-library/react';
import UiButton from '@/components/ui/UiButton';

describe('UiButton', () => {
    test('버튼 텍스트가 보임', () => {
        render(<UiButton btnText="확인"/>);
        expect(screen.getByText('확인')).toBeInTheDocument();
    });

    test('클릭 시 onClick이 호출', () => {
        const onClick = jest.fn();
        render(<UiButton btnText="클릭" onClick={onClick}/>);
        fireEvent.click(screen.getByText('클릭'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('size에 맞는 class가 적용', () => {
        render(<UiButton btnText="버튼" size="l"/>);
        expect(screen.getByRole('button')).toHaveClass('px-5 py-5 text-lg');
    });

    test('color에 맞는 class가 적용', () => {
        render(<UiButton btnText="버튼" color="blackFill"/>);
        expect(screen.getByRole('button')).toHaveClass('btn-black-fill');
    });
});
