import { Form, Grid, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import { useRouter } from "next/router";

const NewTask = () => {
  const { query, push } = useRouter();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    expiration: "",
  });
  const [finishedd, setFinishedd] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = [];
    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);

    if (query.id) {
      await updateTask();
    } else {
      await createTask();
    }
    await push("/");
  };

  const createTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      return error;
    }
  };
  const updateTask = async () => {
    try {
      const taskUpdate = {
        title: newTask.title,
        description: newTask.description,
        finished: finishedd,
        expiration: newTask.expiration,
      };
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskUpdate),
      });
    } catch (error) {
      return error;
    }
  };

  const getTask = async () => {
    const res = await fetch("http://localhost:3000/api/tasks/" + query.id);
    const data = await res.json();
    setNewTask({
      title: data.title,
      description: data.description,
      finished: data.finished,
      expiration: data.expiration,
    });
    setFinishedd(data.finished);
  };

  useEffect(() => {
    if (query.id) {
      getTask();
    }
  }, []);

  return (
    <Grid
      centered
      verticalAlign="=middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="">
          <h1 className="text-center">
            {query.id ? "Update Tasks" : "Create Task"}
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={newTask.title}
              error={
                errors.title
                  ? { content: errors.title, pointing: "below" }
                  : null
              }
            />
            <Form.TextArea
              label="Description"
              name="description"
              onChange={handleChange}
              placeholder="Description"
              value={newTask.description}
              error={
                errors.description
                  ? { content: errors.description, pointing: "below" }
                  : null
              }
            />
            <div className="field">
              <div className="ui date">
                <label className="fw-bold">Expired</label>
                <input
                  type="date"
                  name="expiration"
                  value={moment(newTask.expiration).format("YYYY-MM-DD")}
                  onChange={handleChange}
                />
              </div>
            </div>
            {query.id ? (
              <div className="field">
                <div class="ui checkbox">
                  <input
                    type="checkbox"
                    tabindex="0"
                    className=""
                    name="finished"
                    checked={finishedd}
                    onChange={() => {
                      setFinishedd(!finishedd);
                    }}
                  />
                  <label>Finished</label>
                </div>
              </div>
            ) : null}
            <Button primary textAlign="end">
              {query.id ? "Update" : "Save"}
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NewTask;
