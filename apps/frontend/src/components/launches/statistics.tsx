import React, { FC, Fragment, useCallback } from 'react';
import { useModals } from '@mantine/modals';
import useSWR from 'swr';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
export const StatisticsModal: FC<{
  postId: string;
}> = (props) => {
  const { postId } = props;
  const modals = useModals();
  const t = useT();
  const fetch = useFetch();
  const loadStatistics = useCallback(async () => {
    return (await fetch(`/posts/${postId}/statistics`)).json();
  }, [postId]);
  const closeAll = useCallback(() => {
    modals.closeAll();
  }, []);
  const { data, isLoading } = useSWR(
    `/posts/${postId}/statistics`,
    loadStatistics
  );
  return (
    <div className="bg-sixth p-[32px] w-full max-w-[920px] mx-auto flex flex-col rounded-[4px] border border-customColor6 relative">
      <button
        onClick={closeAll}
        className="outline-none absolute end-[20px] top-[15px] mantine-UnstyledButton-root mantine-ActionIcon-root hover:bg-tableBorder cursor-pointer mantine-Modal-close mantine-1dcetaa"
        type="button"
      >
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
        >
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <h1 className="text-[24px]">{t('statistics', 'Statistics')}</h1>
      {isLoading ? (
        <div>{t('loading', 'Loading')}</div>
      ) : (
        <>
          {data.clicks.length === 0 ? (
            'No Results'
          ) : (
            <>
              <div className="grid grid-cols-3 mt-[20px]">
                <div className="bg-forth p-[4px] rounded-tl-lg">
                  {t('short_link', 'Short Link')}
                </div>
                <div className="bg-forth p-[4px]">
                  {t('original_link', 'Original Link')}
                </div>
                <div className="bg-forth p-[4px] rounded-tr-lg">
                  {t('clicks', 'Clicks')}
                </div>
                {data.clicks.map((p: any) => (
                  <Fragment key={p.short}>
                    <div className="p-[4px] py-[10px] bg-customColor6">
                      {p.short}
                    </div>
                    <div className="p-[4px] py-[10px] bg-customColor6">
                      {p.original}
                    </div>
                    <div className="p-[4px] py-[10px] bg-customColor6">
                      {p.clicks}
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
