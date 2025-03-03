import { Form, FormSection } from "components/ResumeForm/Form";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import {
  BulletListTextarea,
  Input
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeCustoms, selectCustoms } from "lib/redux/resumeSlice";
import type { ResumeCustom } from "lib/redux/types";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
} from "lib/redux/settingsSlice";

export const CustomForm = () => {
  const customs = useAppSelector(selectCustoms);
  const dispatch = useAppDispatch();
  const form = "customs";
  const showDelete = customs.length > 1;
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  return (
    <Form form={form} addButtonText="Add Custom Section">
      {customs.map(({ title, descriptions }, idx) => {
        const handleCustomChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeCustom>
        ) => {
          dispatch(changeCustoms({ idx, field, value } as any));
        };

        const handleShowBulletPoints = (value: boolean) => {
          dispatch(changeShowBulletPoints({ field: form, value }));
        };

        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== customs.length - 1;

        return (
          <FormSection
            key={idx}
            form="customs"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete section"
          >
            <Input
              label="Section Title"
              labelClassName="col-span-full"
              name="title"
              placeholder="Custom Section Title"
              value={title}
              onChange={handleCustomChange}
            />
            <div className="relative col-span-full">
              <BulletListTextarea
                label="Content"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Bullet points"
                value={descriptions}
                onChange={handleCustomChange}
                showBulletPoints={showBulletPoints}
              />
              <div className="absolute left-[4.7rem] top-[0.07rem]">
                <BulletListIconButton
                  showBulletPoints={showBulletPoints}
                  onClick={handleShowBulletPoints}
                />
              </div>
            </div>
          </FormSection>
        );
      })}
    </Form>
  );
};
