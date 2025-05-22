import { LucideProps } from 'lucide-react';
import * as Icons from 'lucide-react';

type LucideIconProps = LucideProps & {
  iconName: string | null;
};

const LucideIcon: React.FC<LucideIconProps> = ({ iconName, ...props }) => {
  if (!iconName) {
    console.warn('Icon name is required.');
    return <Icons.HelpCircle {...props} />;
  }
  const formattedName =
    iconName.charAt(0).toUpperCase() + iconName.slice(1);

  const IconComponent = (Icons as unknown as Record<string, React.FC<LucideProps>>)[formattedName];

  if (!IconComponent) {
    console.warn(`Icon "${formattedName}" not found in lucide-react.`);
    return <Icons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};

export default LucideIcon;
