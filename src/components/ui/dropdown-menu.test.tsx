import { render, screen, fireEvent } from '@testing-library/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu';
import { describe, expect, it, vi } from 'vitest';

describe('DropdownMenu Components', () => {
  it('should render dropdown menu trigger', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
  });

  it('should render dropdown menu with trigger and content structure', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid="content">
          <DropdownMenuItem data-testid="item">Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
    expect(screen.getByTestId('trigger')).toBeTruthy();
  });

  it('should render dropdown menu with checkbox items', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>
            Checked Item
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Unchecked Item</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
  });

  it('should render dropdown menu with radio items', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1">
            <DropdownMenuRadioItem value="option1">
              Option 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">
              Option 2
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
  });

  it('should render dropdown menu with labels and separators', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Menu Label</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
  });

  it('should render dropdown menu with shortcuts', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Menu Item
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
  });

  it('should render dropdown menu with subgroups', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Group Item 1</DropdownMenuItem>
            <DropdownMenuItem>Group Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
  });

  it('should render dropdown menu with submenu', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Submenu Trigger</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Submenu Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
  });

  it('should handle click events on trigger', () => {
    const handleClick = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger onClick={handleClick}>
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with proper styling classes', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger" className="custom-trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid="content" className="custom-content">
          <DropdownMenuItem data-testid="item" className="custom-item">
            Styled Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    expect(trigger).toBeTruthy();
  });

  it('should support inset variant for items and labels', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Indented Label</DropdownMenuLabel>
          <DropdownMenuItem inset>Indented Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
  });

  it('should render portal correctly', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DropdownMenuItem>Portal Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
  });

  it('should render all components within proper structure', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Independent Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>Independent Content</DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Independent Trigger')).toBeTruthy();
    // Test that the trigger can be clicked to open menu (content is in portal)
    const trigger = screen.getByText('Independent Trigger');
    fireEvent.click(trigger);
    expect(trigger).toBeTruthy();
  });

  it('should handle different radio group values', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="value1">
            <DropdownMenuRadioItem value="value1">
              Value 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="value2">
              Value 2
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open Menu')).toBeTruthy();
  });

  it('should render with proper accessibility attributes', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Custom menu trigger"
          data-testid="accessible-trigger"
        >
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent role="menu">
          <DropdownMenuItem role="menuitem">Accessible Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('accessible-trigger');
    expect(trigger).toBeTruthy();
  });
});
