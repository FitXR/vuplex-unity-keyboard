import { ReactElement } from 'react';

export default interface KeyDefinition {
  onHover?: () => void;
  onClick: () => void;
  value: string|ReactElement;
}
