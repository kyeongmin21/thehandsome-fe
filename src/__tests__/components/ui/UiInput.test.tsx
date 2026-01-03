import {render, screen, fireEvent} from '@testing-library/react';
import UiInput from '@/components/ui/UiInput';

describe('UiInput', () => {
    test('label이 보임', () => {
        render(<UiInput label="아이디"/>);
        expect(screen.getByText('아이디')).toBeInTheDocument();
    });

    test('description이 있으면 보임', () => {
        render(<UiInput label="비밀번호" description="8자 이상"/>);
        expect(screen.getByText('8자 이상')).toBeInTheDocument();
    });

    test('input이 렌더링', () => {
        render(<UiInput label="이메일"/>);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('password 타입이면 아이콘이 보임', () => {
        render(<UiInput label="비밀번호" type="password"/>);
        expect(document.querySelector('.eyes-icon')).toBeInTheDocument();
    });

    test('아이콘 클릭 시 비밀번호 표시가 토글', () => {
        render(<UiInput label="비밀번호" type="password"/>);

        const input = screen.getByLabelText('비밀번호');
        const icon = document.querySelector('.eyes-icon')!;

        expect(input).toHaveAttribute('type', 'password');

        fireEvent.click(icon);
        expect(input).toHaveAttribute('type', 'text');

        fireEvent.click(icon);
        expect(input).toHaveAttribute('type', 'password');
    });
});
