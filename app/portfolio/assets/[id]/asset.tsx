import { AssetLiability } from "@prisma/client";

const Asset: React.FC<AssetLiability> = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1>{props.label}</h1>
    </div>
  );
};

export default Asset;
