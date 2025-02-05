/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useCallback, FC } from 'react';
import { FormattedMessage } from '@kbn/i18n-react';

import {
  EuiFlyout,
  EuiFlyoutHeader,
  EuiTitle,
  EuiFlyoutBody,
  useGeneratedHtmlId,
  EuiFlyoutFooter,
  EuiButton,
  EuiSpacer,
} from '@elastic/eui';
import { css } from '@emotion/react';
import { useFieldStatsFlyoutContext } from './use_field_stats_flytout_context';
import { FieldStatsContent } from './field_stats_content';

export const FieldStatsFlyout: FC = () => {
  const { setIsFlyoutVisible, isFlyoutVisible, fieldName } = useFieldStatsFlyoutContext();

  const closeFlyout = useCallback(() => setIsFlyoutVisible(false), []); // eslint-disable-line react-hooks/exhaustive-deps
  const pushedFlyoutTitleId = useGeneratedHtmlId({
    prefix: 'mlJobCreationWizardFieldStats',
  });

  if (isFlyoutVisible) {
    return (
      <EuiFlyout type="push" size="xs" onClose={closeFlyout} aria-labelledby={pushedFlyoutTitleId}>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h3 id={pushedFlyoutTitleId}>
              <FormattedMessage
                id="xpack.ml.newJob.wizard.fieldContextFlyoutTitle"
                defaultMessage="Field statistics"
              />
            </h3>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody
          css={css`
            width: 300px;
          `}
        >
          <b>{fieldName}</b>
          <EuiSpacer />
          <FieldStatsContent />
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiButton onClick={closeFlyout}>
            <FormattedMessage
              id="xpack.ml.newJob.wizard.fieldContextFlyoutCloseButton"
              defaultMessage="Close"
            />
          </EuiButton>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }

  return null;
};
