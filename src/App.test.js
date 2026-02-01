import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders todo app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Todo App/i);
  expect(titleElement).toBeInTheDocument();
});

test('adds a todo with priority', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Add a new task/i);
  const addButton = screen.getByText('Add');
  
  fireEvent.change(input, { target: { value: 'Test task' } });
  fireEvent.click(addButton);
  
  const todoText = screen.getByText('Test task');
  expect(todoText).toBeInTheDocument();
});

test('priority select is available', () => {
  render(<App />);
  const selects = screen.getAllByDisplayValue(/High|Medium|Low/i);
  expect(selects.length).toBeGreaterThan(0);
});
