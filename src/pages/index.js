import { Layout } from "components/Layout";
import Image from "next/image";
import { Button, Card, Container, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { useState } from "react";

const Index = ({ data }) => {
  const router = useRouter();
  const aaa = new Date("2022-10-23").getTime();
  const aaaaP = moment(aaa).format("DD/MM/YYYY");
  const dateNow = new Date().getTime();
  const dateParseMoment = moment(dateNow).format("DD/MM/YYYY");
  const diffDays = dateNow - aaa;
  // console.log(diffDays/(1000*60*60*24))

  if (data.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "50vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>No hay tareas aun</h1>
            <Image
              src="/images/data-not-found.webp"
              alt="Not Data"
              priority
              height={200}
              width={200}
            />
            <div>
              <Button primary>Create a Task</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  return (
    <Container style={{ paddingTop: "40px" }}>
      <Card.Group itemsPerRow={4}>
        {data.map((d) => {
          const dateCreated = new Date(d.createdAt);
          const diff = dateNow - dateCreated;
          const diffDays = diff / (1000 * 60 * 60 * 24);
          const dateExpiration = new Date(d.expiration);
          const diffExpiration = dateExpiration - dateNow;
          const diffDaysExp = diffExpiration / (1000 * 60 * 60 * 24);
          return (
            <Card key={d._id}>
              <Card.Content>
                <Card.Header>
                  {d.title}{" "}
                  {diffDays < 2 ? (
                    <h6>
                      Example heading <span class="badge bg-primary">New</span>
                    </h6>
                  ) : null}
                </Card.Header>
                {
                  diffDaysExp < 0 ? (
                    <a class="ui red ribbon right ribbon label">Vencida</a>
                  ) : diffDaysExp > 5 ? null : (
                    <a class="ui orange right ribbon label">Por vencer</a>
                  )
                }
                <h5>{d.description}</h5>
                <p>Expira: {moment(d.expiration).format("DD/MM/YYYY")}</p>
                <div class="field">
                  <div class="ui checkbox">
                    <input type="checkbox" tabindex="0" checked={d.finished} disabled/>
                    <label>Realizada</label>
                  </div>
                </div>
              </Card.Content>
              <Card.Content extra>
                <Button primary onClick={() => router.push(`/tasks/${d._id}`)}>
                  View
                </Button>
                <Button
                  color='green'
                  onClick={() => router.push(`/tasks/${d._id}/edit`)}
                >
                  Edit
                </Button>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </Container>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
