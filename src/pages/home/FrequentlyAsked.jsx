

const FrequentlyAsked = () => {
    return (
        <div className="mt-20 md:mt-32 max-w-7xl mx-auto bg-slate-300 px-10 py-20 lg:rounded-lg">

            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-500 mb-10">Frequently asked questions</h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="space-y-4 md:w-1/2">
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            What is the purpose of our study group?
                        </div>
                        <div className="collapse-content">
                            <p className="text-justify">Answer: Our study group is aimed at collaboratively learning and understanding course materials, helping each other with challenging concepts, and preparing for exams.</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            How often are we planning to meet for study sessions?
                        </div>
                        <div className="collapse-content">
                            <p className="text-justify">Answer: We aim to meet twice a week for study sessions, but the schedule is flexible and subject to group members&apos; availability.</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            How should we coordinate our study materials?
                        </div>
                        <div className="collapse-content">
                            <p className="text-justify">Answer: We can use [platform/tool] to share documents, organize study notes, and collaborate on projects. Make sure to upload relevant materials there.</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 md:w-1/2">
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            What topics are we covering in the next study session?
                        </div>
                        <div className="collapse-content">
                            <p className="text-justify">Answer: Our upcoming session will focus on [specific topics]. Please review the relevant materials beforehand to make our discussion more productive.</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            What&apos;s our plan for reviewing before exams?
                        </div>
                        <div className="collapse-content">
                            <p className="text-justify">Answer: As the exam approaches, we&apos;ll schedule additional review sessions. In the meantime, make sure to keep up with the study materials and ask questions as needed.</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">
                            What resources do you recommend for additional study?
                        </div>
                        <div className="collapse-content">
                            <p className="text-justify">Answer: Check out [list of recommended resources], which includes textbooks, online articles, and video tutorials. Feel free to add your suggestions as well.</p>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default FrequentlyAsked;