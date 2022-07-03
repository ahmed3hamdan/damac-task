import {
  Badge,
  Button,
  Card,
  createStyles,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { Book2, Edit, Trash } from "tabler-icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles({
  textEllipsis: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

const BookCard = ({ book: { id, name, author, imageUrl, pages, price } }) => {
  const { classes } = useStyles();
  return (
    <Card shadow="sm">
      <Card.Section>
        <Image
          height={320}
          src={imageUrl}
          withPlaceholder
          placeholder={<Book2 size={64} />}
          alt={`${name} cover by ${author}`}
        />
      </Card.Section>
      <Group noWrap grow mt="xs">
        <Badge size="lg" color="pink" variant="dot">
          {pages} Page
        </Badge>
        <Badge size="lg" color="teal" variant="dot">
          {price}$
        </Badge>
      </Group>
      <Text className={classes.textEllipsis} weight="bold" mt="xs">
        {name}
      </Text>
      <Text className={classes.textEllipsis} color="dimmed" size="sm">
        {author}
      </Text>

      <Group grow mt="xs">
        <Button
          component={Link}
          to={`edit/${id}`}
          variant="light"
          color="blue"
          leftIcon={<Edit />}
        >
          Edit
        </Button>
        <Button
          component={Link}
          to={`delete/${id}`}
          variant="light"
          color="red"
          leftIcon={<Trash />}
        >
          Delete
        </Button>
      </Group>
    </Card>
  );
};

export default BookCard;
