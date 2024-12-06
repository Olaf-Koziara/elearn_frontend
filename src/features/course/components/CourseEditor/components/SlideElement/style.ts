import styled from "styled-components";
import SlideElement from "./SlideElement";
import {CourseSlideElement} from "../../../../models/courseSlideModel";

export const SlideElementWrapper = styled.div<{ $type: CourseSlideElement['type'] }>`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: ${({theme, $type}) => $type === 'text' && theme.spacing.xs} ${({
                                                                            theme,
                                                                            $type
                                                                          }) => $type === 'text' && theme.spacing.sm};

  p {
    margin: 0;
  }
`;