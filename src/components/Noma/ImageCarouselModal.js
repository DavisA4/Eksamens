import React from "react";
import { Modal, Carousel } from "antd";

const ImageCarouselModal = ({ visible, images, onClose, initialSlide }) => {
  return (
    <Modal
      title="Car Images"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
    >
      <Carousel
        dots={true}
        autoplay={false}
        initialSlide={initialSlide}
        draggable={true}
      >
        {images.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={imageUrl}
              alt={`Image ${index}`}
              style={{
                width: "100%",
                objectFit: "cover", // Crop image to fit container
                height: "600px", // Set fixed height
              }}
            />
          </div>
        ))}
      </Carousel>
    </Modal>
  );
};

export default ImageCarouselModal;
