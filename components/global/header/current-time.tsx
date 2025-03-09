const CurrentTime = () => {
  return (
    <p className="font-bold text-muted-foreground">
      {new Date().toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
  );
};

export default CurrentTime;
