import { render, screen, fireEvent } from '@testing-library/react';
import Tasks from './Tasks';

// npx vitest

test('create task', () => { // Создание задачи
  render(<Tasks />);

  const input = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(input, { target: { value: 'Новая задача' } });
  fireEvent.submit(input.closest('form'));

  expect(screen.getByText('Новая задача')).toBeInTheDocument();
});

test('mark as completed', () => { // Отметка как выполненной
  render(<Tasks />);

  const input = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(input, { target: { value: 'Задача' } });
  fireEvent.submit(input.closest('form'));

  const task = screen.getByText('Задача');
  fireEvent.click(task);

  expect(task).toHaveClass('completed');
});

test('mark as nocompleted', () => { // Снятие отметки выполненной
  render(<Tasks />);

  const input = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(input, { target: { value: 'Задача' } });
  fireEvent.submit(input.closest('form'));

  const task = screen.getByText('Задача');
  fireEvent.click(task);
  fireEvent.click(task);

  expect(task).not.toHaveClass('completed');
});

test('filter active task', () => { // Фильтрация по активным
  render(<Tasks />);

  const input = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(input, { target: { value: 'Задача 1' } });
  fireEvent.submit(input.closest('form'));

  fireEvent.change(input, { target: { value: 'Задача 2' } });
  fireEvent.submit(input.closest('form'));

  const task1 = screen.getByText('Задача 1');
  fireEvent.click(task1);

  fireEvent.click(screen.getByText('Active'));

  expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
  expect(screen.getByText('Задача 2')).toBeInTheDocument();
});

test('filter completed task', () => { // Фильтрация по завершённым
  render(<Tasks />);

  const input = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(input, { target: { value: 'Задача 1' } });
  fireEvent.submit(input.closest('form'));

  fireEvent.change(input, { target: { value: 'Задача 2' } });
  fireEvent.submit(input.closest('form'));

  const task1 = screen.getByText('Задача 1');
  fireEvent.click(task1);

  fireEvent.click(screen.getByText('Completed'));

  expect(screen.getByText('Задача 1')).toBeInTheDocument();
  expect(screen.queryByText('Задача 2')).not.toBeInTheDocument();
});

test('clear completed', () => { // Очистка завершённых
  render(<Tasks />);

  const input = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(input, { target: { value: 'Задача 1' } });
  fireEvent.submit(input.closest('form'));

  fireEvent.change(input, { target: { value: 'Задача 2' } });
  fireEvent.submit(input.closest('form'));

  const task1 = screen.getByText('Задача 1');
  fireEvent.click(task1);

  fireEvent.click(screen.getByText('Clear completed'));

  expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
  expect(screen.getByText('Задача 2')).toBeInTheDocument();
});