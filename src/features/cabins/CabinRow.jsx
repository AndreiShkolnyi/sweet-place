import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./model/hooks/useDeleteCabin";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { useCreateOrEditCabin } from "./model/hooks/useCreateOrEditCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const {
    id: cabinId,
    image,
    discount,
    maxCapacity,
    regularPrice,
    name,
  } = cabin;
  const { mutate, isLoading: isDeleting } = useDeleteCabin();
  const { mutate: onDuplicateCabin, isLoading: isDuplicating } =
    useCreateOrEditCabin({});

  const onDuplicateHandler = () => {
    onDuplicateCabin({
      newCabin: {
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        image,
        discount,
      },
    });
  };

  return (
    <>
      <Table.Row columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Img src={image || ""} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  disabled={isDuplicating}
                  icon={<HiSquare2Stack />}
                  onClick={onDuplicateHandler}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens='edit-cabin'>
                  <Menus.Button disabled={isDeleting} icon={<HiPencil />}>
                    Edit
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens='delete-cabin'>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
            <Modal.Window name='edit-cabin'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Window name='delete-cabin'>
              <ConfirmDelete
                onConfirm={() => mutate(cabinId)}
                resourceName='cabins'
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;