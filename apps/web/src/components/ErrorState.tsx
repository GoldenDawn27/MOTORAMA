import Card from "./Card";

type ErrorStateProps = {
  title: string;
  description: string;
};

export default function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <Card>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
}
