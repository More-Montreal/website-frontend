import * as React from "react";
import { useTranslation } from "@herob191/gatsby-plugin-react-i18next";
import { PolicyGrade } from "../../helpers/content-types";
import GradeMedal from "./grade-medal";
import SupportTick from "./support-tick";

type ScoreBreakdownModalProps = {
    onClose: Function;
};

const ScoreBreakdownModal = ({ onClose }: ScoreBreakdownModalProps) => {
    const { t } = useTranslation();

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target !== e.currentTarget) return;
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full backdrop-blur bg-black/20" onClick={closeModal}>
            <div className="absolute max-w-full -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl top-1/2 left-1/2 w-[700px] rounded-3xl overflow-y-auto max-h-full">
                <div className="flex justify-end">
                    <p
                        onClick={closeModal}
                        className="flex-shrink px-4 text-3xl text-gray-700 align-middle cursor-pointer"
                    >
                        &times;
                    </p>
                </div>
                <div className="p-4 lg:p-8">
                    <p className="text-xl text-gray-800 font-bold font-display">
                        {t("policies.scoring_breakdown.title")}
                    </p>
                    <p className="text-gray-600 mb-4">{t("policies.scoring_breakdown.description")}</p>
                    <p className="text-lg font-medium text-gray-700">{t("policies.scoring_breakdown.ranking_title")}</p>
                    <p className="text-gray-600">{t("policies.scoring_breakdown.ranking_description")}</p>
                    <div className="flex py-4">
                        <div className="flex-1 flex justify-center items-end flex-wrap">
                            <div className="w-1/3">
                                <GradeMedal grade={PolicyGrade.BRONZE} />
                            </div>
                            <p className="text-gray-500 text-center w-full">{t("policies.scoring_breakdown.bronze")}</p>
                            <p className="text-gray-700 font-medium text-center text-lg w-full">1 point</p>
                        </div>
                        <div className="flex-1 flex justify-center items-end flex-wrap">
                            <div className="w-1/3">
                                <GradeMedal grade={PolicyGrade.SILVER} />
                            </div>
                            <p className="text-gray-500 text-center w-full">{t("policies.scoring_breakdown.silver")}</p>
                            <p className="text-gray-700 font-medium text-center text-lg w-full">2 points</p>
                        </div>
                        <div className="flex-1 flex justify-center items-end flex-wrap">
                            <div className="w-1/3">
                                <GradeMedal grade={PolicyGrade.GOLD} />
                            </div>
                            <p className="text-gray-500 text-center w-full">{t("policies.scoring_breakdown.gold")}</p>
                            <p className="text-gray-700 font-medium text-center text-lg w-full">4 points</p>
                        </div>
                    </div>
                    <p className="text-lg font-medium text-gray-700">{t("policies.scoring_breakdown.support_type")}</p>
                    <p className="text-gray-600 mb-2">{t("policies.scoring_breakdown.support_description")}</p>
                    <div className="flex items-center gap-2 py-2">
                        <div className="flex-shrink">
                            <SupportTick color="gray" full={false} />
                        </div>
                        <p className="flex-1 text-gray-600">
                            {t("policies.scoring_breakdown.partial_support")}:{" "}
                            <span className="text-gray-500">{t("policies.scoring_breakdown.half_points")}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                        <div className="flex-shrink">
                            <SupportTick color="gray" full={true} />
                        </div>
                        <p className="flex-1 text-gray-600">
                            {t("policies.scoring_breakdown.full_support")}:{" "}
                            <span className="text-gray-500">{t("policies.scoring_breakdown.full_points")}</span>
                        </p>
                    </div>
                    <p className="text-lg font-medium text-gray-700 mt-2">
                        {t("policies.scoring_breakdown.final_score_title")}
                    </p>
                    <p className="text-gray-600">{t("policies.scoring_breakdown.final_score_description")}</p>
                </div>
            </div>
        </div>
    );
};

export default ScoreBreakdownModal;
