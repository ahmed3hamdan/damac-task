import { Alert, Button, Grid, NumberInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
  AlertCircle,
  Book,
  CurrencyDollar,
  Link,
  Notebook,
  Writing,
} from "tabler-icons-react";

const bookSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required." }),
  author: z.string().trim().min(1, { message: "Author is required." }),
  imageUrl: z
    .string()
    .trim()
    .url()
    .nullable()
    .or(z.string().length(0))
    .transform(val => (val?.length === 0 ? null : val)),
  pages: z.number().int().nonnegative(),
  price: z.number().nonnegative(),
});

const defaultInitialValues = {
  name: "",
  author: "",
  imageUrl: "",
  pages: 0,
  price: 0,
};

const BookForm = ({
  initialValues = defaultInitialValues,
  onSubmit,
  isSubmitting,
  alertMessage,
}) => {
  const form = useForm({
    schema: zodResolver(bookSchema),
    initialValues,
  });

  const handleSubmit = form.onSubmit(
    values => onSubmit && onSubmit(bookSchema.parse(values))
  );

  return (
    <Grid component="form" noValidate onSubmit={handleSubmit}>
      <Grid.Col md={6}>
        <TextInput
          size="md"
          required
          icon={<Book />}
          label="Name"
          placeholder="Moby-Dick"
          disabled={isSubmitting}
          {...form.getInputProps("name")}
        />
      </Grid.Col>
      <Grid.Col md={6}>
        <TextInput
          size="md"
          required
          icon={<Writing />}
          label="Author"
          placeholder="Herman Melville"
          disabled={isSubmitting}
          {...form.getInputProps("author")}
        />
      </Grid.Col>
      <Grid.Col>
        <TextInput
          size="md"
          icon={<Link />}
          label="Cover"
          description="The URL of book's cover image."
          placeholder="https://example.com/moby-dick.jpg"
          disabled={isSubmitting}
          {...form.getInputProps("imageUrl")}
        />
      </Grid.Col>
      <Grid.Col md={6}>
        <NumberInput
          size="md"
          required
          icon={<Notebook />}
          label="Number of Pages"
          disabled={isSubmitting}
          min={0}
          {...form.getInputProps("pages")}
        />
      </Grid.Col>
      <Grid.Col md={6}>
        <NumberInput
          size="md"
          required
          icon={<CurrencyDollar />}
          label="Price (in USD$)"
          disabled={isSubmitting}
          min={0}
          precision={2}
          {...form.getInputProps("price")}
        />
      </Grid.Col>
      {alertMessage && (
        <Grid.Col>
          <Alert icon={<AlertCircle size={24} />} color="red">
            {alertMessage}
          </Alert>
        </Grid.Col>
      )}
      <Grid.Col>
        <Button
          type="submit"
          size="md"
          uppercase
          fullWidth
          loading={isSubmitting}
        >
          Submit
        </Button>
      </Grid.Col>
    </Grid>
  );
};

export default BookForm;
