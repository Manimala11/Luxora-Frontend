import { Modal } from 'antd';

const DeleteModal = ({ open, onConfirm, onCancel, message }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Yes"
      cancelText="No"
      okType="danger"
      centered
      zIndex={200}
      modalRender={(node) => (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          {node}
        </div>
      )}
    >
      <div className="text-center">
        <i
          className="fa-solid fa-triangle-exclamation text-danger"
          style={{ fontSize: '50px' }}
        ></i>
        <p className="mt-3">{message || "Are you sure you want to delete?"}</p>
      </div>
    </Modal>
  );
};

export default DeleteModal;
