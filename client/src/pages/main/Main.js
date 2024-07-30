import React from "react";
import S from "./style";
import Input from "../../components/input/style";
import DetourButton from "../../components/button/DetourButton";

const Main = () => {
    return (
        <S.Main>
            {/* popular */}
            <S.PopularSection>
                <h2>🔥요즘 핫한 국내 여행 랭킹</h2>
                <S.ArticleContainer>
                    <S.PopularArticle>
                        <img src={process.env.PUBLIC_URL + "/images/main/1.png"} />
                        <S.PopularArticleH4>울산</S.PopularArticleH4>
                        <S.PopularArticleButtonWrapper>
                            <DetourButton variant="gray" shape="tiny" size="tiny" color="black" border="gray">
                                둘러보기
                            </DetourButton>
                        </S.PopularArticleButtonWrapper>
                    </S.PopularArticle>
                    <S.PopularArticle>
                        <img src={process.env.PUBLIC_URL + "/images/main/2.png"} />
                        <S.PopularArticleH4>포항</S.PopularArticleH4>
                        <S.PopularArticleButtonWrapper>
                            <DetourButton variant="gray" shape="tiny" size="tiny" color="black" border="gray">
                                둘러보기
                            </DetourButton>
                        </S.PopularArticleButtonWrapper>
                    </S.PopularArticle>
                    <S.PopularArticle>
                        <img src={process.env.PUBLIC_URL + "/images/main/3.png"} />
                        <S.PopularArticleH4>양양</S.PopularArticleH4>
                        <S.PopularArticleButtonWrapper>
                            <DetourButton variant="gray" shape="tiny" size="tiny" color="black" border="gray">
                                둘러보기
                            </DetourButton>
                        </S.PopularArticleButtonWrapper>
                    </S.PopularArticle>
                </S.ArticleContainer>
            </S.PopularSection>

            {/* trending */}
            <section>
                <h2>⚡떠오르는 국내 여행지는 여기</h2>
            </section>

            {/* <S.SearchSection>
                <h2>👒 다른 사람들은 어떤 경로로?</h2>
                <p>최근 등록 경로 순으로 요즘 핫한 곳을 한눈에!</p>
                <S.SearchBar>
                    <Input
                        type="text"
                        variant={"main"}
                        shape={"extraLarge"}
                        size={"extraLarge"}
                        color={"black"}
                        border={"default"}
                        style={{ textAlign: "center" }}
                        placeholder="키워드를 입력하세요"
                    />
                    <S.SearchButton>
                        <img src={process.env.PUBLIC_URL + "/images/main/Search.png"} />
                    </S.SearchButton>
                </S.SearchBar>
            </S.SearchSection>
            <S.TripSection id="trips-container"></S.TripSection> */}
        </S.Main>
    );
};

export default Main;
