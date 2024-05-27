import React, { FC, ReactNode } from "react";

import Modal from "@mui/material/Modal";
import Box, { BoxProps } from "@mui/material/Box";

interface IModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  style?: BoxProps["sx"];
}

const ModalContainer: FC<IModalContainerProps> = ({
  children,
  isOpen,
  onClose,
  style,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalContainer;
