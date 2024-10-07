import { Attribute } from "@prisma/client";
import AttributeComponent from "./attribute";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useExpandedContext } from "../expanded-content/expanded-content";

interface AttributesProps {
  attributes: Attribute[];
  save: (data: Record<string, any>, id?: string) => void;
  readOnly?: boolean;
}

const Attributes: React.FC<AttributesProps> = ({
  attributes,
  save,
  readOnly,
}) => {
  const { expanded } = useExpandedContext();
  return (
    <div className="flex flex-col w-full h-[calc(100%-40px)]">
      <ScrollArea className="flex-1 pr-3">
        {attributes.map((attribute) => (
          <AttributeComponent
            key={attribute.id}
            {...attribute}
            save={save}
            disabled={readOnly}
          />
        ))}
      </ScrollArea>
      {expanded && !readOnly && (
        <AttributeComponent save={save} disabled={readOnly} />
      )}
    </div>
  );
};

export default Attributes;
