import { render, screen } from '@testing-library/react';

describe('Main test', () => {
	it('Mock test', () => {
		render(<div>DivTest</div>);
		// The div should be present
		expect(screen.getByText('DivTest')).toBeInTheDocument();
	});
});
