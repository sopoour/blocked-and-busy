import { FC, ReactNode } from 'react';
import { CloseButton, Header } from './Sidebar.styles';
import { useMedia } from '@app/src/hooks/useMedia';
import { Breakpoints } from '@app/src/styles/media';
import { Drawer } from '@mui/material';
import Close from './close.svg';

type Props = {
  side: 'left' | 'right';
  open: boolean;
  onClose: () => void;
  backgroundColor?: string;
  className?: string;
  children: ReactNode;
};

const Sidebar: FC<Props> = ({
  side,
  open,
  backgroundColor = '#E2B6E7',
  onClose,
  className = '',
  children,
}) => {
  const isDesktop = useMedia(Breakpoints.sm);
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={isDesktop ? side : 'bottom'}
      className={className}
      role="sidebar"
      aria-label="Sidebar"
      PaperProps={{
        sx: {
          backgroundColor: backgroundColor,
          width: isDesktop ? '50%' : '100%',
          height: isDesktop ? '100%' : '80%',
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(253, 251, 243, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        },
      }}
    >
      <Header background={backgroundColor} side={side} aria-label="Header of sidebar">
        <CloseButton side={side} onClick={onClose} aria-label="Button to close the sidebar">
          <Close />
        </CloseButton>
      </Header>
      {children}
    </Drawer>
  );
};

export default Sidebar;
