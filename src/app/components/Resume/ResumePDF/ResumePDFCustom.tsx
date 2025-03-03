import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeCustom } from "lib/redux/types";

export const ResumePDFCustom = ({
  customs,
  themeColor,
  showBulletPoints,
}: {
  customs: ResumeCustom[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <>
      {customs.map(({ title, descriptions }, idx) => (
        <ResumePDFSection key={idx} themeColor={themeColor} heading={title}>
          <View style={{ ...styles.flexCol }}>
            <ResumePDFBulletList
              items={descriptions}
              showBulletPoints={showBulletPoints}
            />
          </View>
        </ResumePDFSection>
      ))}
    </>
  );
};
