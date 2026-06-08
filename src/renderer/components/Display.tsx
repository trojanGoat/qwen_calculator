interface DisplayProps {
  value: string;
  expression: string;
}

export function Display({ value, expression }: DisplayProps) {
  const fontSize = value.length > 12 ? 'text-3xl' : value.length > 8 ? 'text-4xl' : 'text-5xl';

  return (
    <div className="bg-card rounded-xl p-6 mb-4 shadow-lg">
      {expression && (
        <div className="text-muted-foreground text-sm text-right h-6 truncate">
          {expression}
        </div>
      )}
      <div className={`${fontSize} font-semibold text-right tracking-tight truncate`}>
        {value}
      </div>
    </div>
  );
}
