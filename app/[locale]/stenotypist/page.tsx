import StenotypistTool from '../../../components/StenotypistTool';

type Props = { params: { locale: string } };

export default function Page({ params }: Props) {
  // simple wrapper to expose the Stenotypist tool under /[locale]/stenotypist
  return <StenotypistTool />;
}
