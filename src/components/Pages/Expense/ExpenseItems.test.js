// ExpenseItems.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpenseItems from './ExpenseItems';

describe('ExpenseItems', () => {
  test('renders the component with the correct name', () => {
    render(<ExpenseItems />);
    const greetingElement = screen.getByText(/Expense/i);
    expect(greetingElement).toBeInTheDocument();
  });
});
