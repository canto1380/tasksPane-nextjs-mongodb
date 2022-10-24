import Error from "next/error";
import { useState } from "react";
import { Button, Grid, Confirm } from "semantic-ui-react";
import { useRouter } from "next/router";

const TaskDetail = ({ data, error }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      return error;
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    deleteTask(data._id);
    close();
    await router.push("/");
  };

  if (error)
    return (
      <Error statusCode={error.statusCode} title={error.statusText}></Error>
    );
  // return <div>{JSON.stringify(data)}</div>;

  return (
    <Grid
      centered
      verticalAlign="=middle"
      columns="1"
      style={{ height: "40vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeleting}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        header="Please confirm"
        content="Are you sure you want to delete this task?"
        open={modalOpen}
        onConfirm={handleDelete}
        onCancel={close}
      ></Confirm>
    </Grid>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
  if (res.status === 200) {
    const data = await res.json();
    return {
      props: { data },
    };
  }
  return {
    props: {
      error: { statusCode: res.status, statusText: "Invalid Id" },
    },
  };
}

export default TaskDetail;
