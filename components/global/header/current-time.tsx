const CurrentTime = () => {
  return (
    <p className="font-bold text-muted-foreground">
      {new Date().toLocaleDateString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
  );
};

export default CurrentTime;
