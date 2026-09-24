---
title: 讲解区
aside: false
pageClass: wide dr-explain
editLink: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div class="dr-page-head">
  <div class="dr-ph-kicker">EXPLAIN</div>
  <h1>讲解区</h1>
  <p>论文精读讲解来自 <b>李沐老师</b> 的《深度学习论文精读》系列，逐段拆解动机、方法与结论。下面按研究方向列出本站全部 <b>99</b> 篇论文：有李沐视频的附上讲解链接，没有的标“暂无讲解”；每篇都附 <b>单词区</b> 与 <b>听力区</b> 链接，方便边看讲解边复习；最右侧新增 <b>论文原文</b> 直链，绝大多数指向 arXiv 原文，少数不在 arXiv 的（如 OpenAI 报告、Nature 文章、会议官网）也一并给出卷首出处。</p>
  <div class="dr-ph-actions">
    <a href="https://space.bilibili.com/1567748478" target="_blank" rel="noopener">李沐的 B 站主页 →</a>
    <a :href="withBase('/vocab/')">去单词区 📖</a>
    <a :href="withBase('/listen/')">去听力区 🎧</a>
  </div>
</div>

::: tip 版权说明
讲解视频来自李沐老师公开分享的《深度学习论文精读》系列（B 站 / YouTube / 知乎同步更新），版权归原作者所有。本站只做整理与索引，方便对照本站的词表页、听力页一起看。
:::

## NLP / 大模型

| 论文 | 视频讲解 | 词汇区 | 本站对照 | 论文原文 |
| -- | -- | -- | -- | -- |
| **GPT-2** (2019)<br><span style="opacity:.72;font-size:.9em">Language Models are Unsupervised Multitask Learners</span> | [B站](https://www.bilibili.com/video/BV1AF411b7xQ/) · [YouTube](https://youtu.be/t70Bl3w7bxY) | [📖 单词](/study/vocab/GPT2_论文词汇.html) · [🎧 听力](/study/listen/GPT2_听力.html) | [📝 笔记区](/paper-notes/GPT2.html) | [📄 论文原文](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) |
| **GPT-3** (2020)<br><span style="opacity:.72;font-size:.9em">Language Models are Few-Shot Learners</span> | [B站](https://www.bilibili.com/video/BV1AF411b7xQ/) · [YouTube](https://youtu.be/t70Bl3w7bxY) | [📖 单词](/study/vocab/GPT3_论文词汇.html) · [🎧 听力](/study/listen/GPT3_听力.html) | [📝 笔记区](/paper-notes/GPT3.html) | [📄 论文原文](https://arxiv.org/abs/2005.14165) |
| **GPT-4** (2023)<br><span style="opacity:.72;font-size:.9em">GPT-4 Technical Report</span> | [B站](https://www.bilibili.com/video/BV1vM4y1U7b5) · [YouTube](https://youtu.be/K0SZ9mdygTw) | [📖 单词](/study/vocab/GPT4_论文词汇.html) · [🎧 听力](/study/listen/GPT4_听力.html) | [📝 笔记区](/paper-notes/GPT4.html) | [📄 论文原文](https://arxiv.org/abs/2303.08774) |
| **Transformer** (2017)<br><span style="opacity:.72;font-size:.9em">Attention Is All You Need</span> | [B站](https://www.bilibili.com/video/BV1pu411o7BE/) · [YouTube](https://youtu.be/nzqlFIcCSWQ) · [知乎](https://www.zhihu.com/zvideo/1437034536677404672) | [📖 单词](/study/vocab/Transformer_论文词汇.html) · [🎧 听力](/study/listen/Transformer_听力.html) | [📝 笔记区](/paper-notes/Transformer.html) | [📄 论文原文](https://arxiv.org/abs/1706.03762) |
| **InstructGPT** (2022)<br><span style="opacity:.72;font-size:.9em">Training Language Models to Follow Instructions with Human Feedback</span> | [B站](https://www.bilibili.com/video/BV1hd4y187CR) · [YouTube](https://youtu.be/zfIGAwD1jOQ) | [📖 单词](/study/vocab/InstructGPT_论文词汇.html) · [🎧 听力](/study/listen/InstructGPT_听力.html) | [📝 笔记区](/paper-notes/InstructGPT.html) | [📄 论文原文](https://arxiv.org/abs/2203.02155) |
| **Whisper** (2022)<br><span style="opacity:.72;font-size:.9em">Robust Speech Recognition via Large-Scale Weak Supervision</span> | [B站](https://www.bilibili.com/video/BV1VG4y1t74x) · [YouTube](https://youtu.be/3eXCJd32UnM) | [📖 单词](/study/vocab/Whisper_论文词汇.html) · [🎧 听力](/study/listen/Whisper_听力.html) | [📝 笔记区](/paper-notes/Whisper.html) | [📄 论文原文](https://arxiv.org/abs/2212.04356) |
| **Chain-of-Thought** (2022)<br><span style="opacity:.72;font-size:.9em">Chain-of-Thought Prompting Elicits Reasoning in Large Language Models</span> | [B站](https://www.bilibili.com/video/BV1t8411e7Ug) · [YouTube](https://youtu.be/H4J59iG3t5o) | [📖 单词](/study/vocab/CoT_论文词汇.html) · [🎧 听力](/study/listen/CoT_听力.html) | [📝 笔记区](/paper-notes/CoT.html) | [📄 论文原文](https://arxiv.org/abs/2201.11903) |
| **BERT** (2019)<br><span style="opacity:.72;font-size:.9em">BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding</span> | [B站](https://www.bilibili.com/video/BV1PL411M7eQ/) · [YouTube](https://youtu.be/ULD3uIb2MHQ) · [知乎](https://www.zhihu.com/zvideo/1445340200976785408) | [📖 单词](/study/vocab/BERT_论文词汇.html) · [🎧 听力](/study/listen/BERT_听力.html) | [📝 笔记区](/paper-notes/BERT.html) | [📄 论文原文](https://arxiv.org/abs/1810.04805) |
| **Llama 3** (2024)<br><span style="opacity:.72;font-size:.9em">The Llama 3 Herd of Models</span> | [B站](https://www.bilibili.com/video/BV1WM4m1y7Uh) · [YouTube](https://www.youtube.com/watch?v=-PztagF3wQE) | [📖 单词](/study/vocab/Llama3_论文词汇.html) · [🎧 听力](/study/listen/Llama3_听力.html) | [📝 笔记区](/paper-notes/Llama3.html) | [📄 论文原文](https://arxiv.org/abs/2407.21783) |
| **Rethinking Generalization** (2017)<br><span style="opacity:.72;font-size:.9em">Understanding Deep Learning Requires Rethinking Generalization</span> | 暂无讲解 | [📖 单词](/study/vocab/泛化性_论文词汇.html) · [🎧 听力](/study/listen/泛化性_听力.html) | [📝 笔记区](/paper-notes/泛化性.html) | [📄 论文原文](https://arxiv.org/abs/1611.03530) |
| **Adam** (2015)<br><span style="opacity:.72;font-size:.9em">Adam: A Method for Stochastic Optimization</span> | 暂无讲解 | [📖 单词](/study/vocab/Adam_论文词汇.html) · [🎧 听力](/study/listen/Adam_听力.html) | [📝 笔记区](/paper-notes/Adam.html) | [📄 论文原文](https://arxiv.org/abs/1412.6980) |
| **HELM** (2022)<br><span style="opacity:.72;font-size:.9em">Holistic Evaluation of Language Models</span> | [B站](https://www.bilibili.com/video/BV1z24y1B7uX) · [YouTube](https://youtu.be/WgFEw9U3BXA) | [📖 单词](/study/vocab/Helm_论文词汇.html) · [🎧 听力](/study/listen/Helm_听力.html) | [📝 笔记区](/paper-notes/Helm.html) | [📄 论文原文](https://arxiv.org/abs/2211.09110) |
| **Anthropic LLM** (2022)<br><span style="opacity:.72;font-size:.9em">Language Models (Mostly) Know What They Know</span> | [B站](https://www.bilibili.com/video/BV1XY411B7nM) · [YouTube](https://youtu.be/iqX0pgNDon0) | [📖 单词](/study/vocab/AnthropicLLM_论文词汇.html) · [🎧 听力](/study/listen/AnthropicLLM_听力.html) | [📝 笔记区](/paper-notes/AnthropicLLM.html) | [📄 论文原文](https://arxiv.org/abs/2207.05221) |
| **Codex** (2021)<br><span style="opacity:.72;font-size:.9em">Evaluating Large Language Models Trained on Code</span> | [B站](https://www.bilibili.com/video/BV1iY41137Zi/) · [YouTube](https://youtu.be/oZriUGkQSNM) · [知乎](https://www.zhihu.com/zvideo/1490959755963666432) | [📖 单词](/study/vocab/Codex_论文词汇.html) · [🎧 听力](/study/listen/Codex_听力.html) | [📝 笔记区](/paper-notes/Codex.html) | [📄 论文原文](https://arxiv.org/abs/2107.03374) |
| **AlphaCode** (2022)<br><span style="opacity:.72;font-size:.9em">Competition-Level Code Generation with AlphaCode</span> | [B站](https://www.bilibili.com/video/BV1ab4y1s7rc/) · [YouTube](https://youtu.be/t8Gzkca9pW4) | [📖 单词](/study/vocab/AlphaCode_论文词汇.html) · [🎧 听力](/study/listen/AlphaCode_听力.html) | [📝 笔记区](/paper-notes/AlphaCode.html) | [📄 论文原文](https://arxiv.org/abs/2203.07814) |
| **NCI** (2022)<br><span style="opacity:.72;font-size:.9em">Neural Corpus Indexer: A Neural Architecture for Document Retrieval</span> | 暂无讲解 | [📖 单词](/study/vocab/NCI_论文词汇.html) · [🎧 听力](/study/listen/NCI_听力.html) | [📝 笔记区](/paper-notes/NCI.html) | [📄 论文原文](https://arxiv.org/abs/2206.02743) |
| **LayerNorm** (2019)<br><span style="opacity:.72;font-size:.9em">Understanding and Improving Layer Normalization</span> | 暂无讲解 | [📖 单词](/study/vocab/LayerNorm_论文词汇.html) · [🎧 听力](/study/listen/LayerNorm_听力.html) | [📝 笔记区](/paper-notes/LayerNorm.html) | [📄 论文原文](https://arxiv.org/abs/1911.07013) |
| **ZeRO** (2020)<br><span style="opacity:.72;font-size:.9em">ZeRO: Memory Optimizations Toward Training Trillion Parameter Models</span> | [B站](https://www.bilibili.com/video/BV1tY411g7ZT/) | [📖 单词](/study/vocab/ZeRO_论文词汇.html) · [🎧 听力](/study/listen/ZeRO_听力.html) | [📝 笔记区](/paper-notes/ZeRO.html) | [📄 论文原文](https://arxiv.org/abs/1910.02054) |
| **AI×数学直觉** (2021)<br><span style="opacity:.72;font-size:.9em">Advancing Mathematics by Guiding Human Intuition with AI</span> | 暂无讲解 | [📖 单词](/study/vocab/MathIntuition_论文词汇.html) · [🎧 听力](/study/listen/MathIntuition_听力.html) | [📝 笔记区](/paper-notes/MathIntuition.html) | [📄 论文原文](https://www.nature.com/articles/s41586-021-04086-x) |

## 目标检测

| 论文 | 视频讲解 | 词汇区 | 本站对照 | 论文原文 |
| -- | -- | -- | -- | -- |
| **R-CNN** (2014)<br><span style="opacity:.72;font-size:.9em">Rich Feature Hierarchies for Accurate Object Detection and Semantic Segmentation</span> | 暂无讲解 | [📖 单词](/study/vocab/RCNN_论文词汇.html) · [🎧 听力](/study/listen/RCNN_听力.html) | [📝 笔记区](/paper-notes/RCNN.html) | [📄 论文原文](https://arxiv.org/abs/1311.2524) |
| **Fast R-CNN** (2015)<br><span style="opacity:.72;font-size:.9em">Fast R-CNN</span> | 暂无讲解 | [📖 单词](/study/vocab/FastRCNN_论文词汇.html) · [🎧 听力](/study/listen/FastRCNN_听力.html) | [📝 笔记区](/paper-notes/FastRCNN.html) | [📄 论文原文](https://arxiv.org/abs/1504.08083) |
| **Faster R-CNN** (2015)<br><span style="opacity:.72;font-size:.9em">Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/FasterRCNN_论文词汇.html) · [🎧 听力](/study/listen/FasterRCNN_听力.html) | [📝 笔记区](/paper-notes/FasterRCNN.html) | [📄 论文原文](https://arxiv.org/abs/1506.01497) |
| **SSD** (2016)<br><span style="opacity:.72;font-size:.9em">SSD: Single Shot MultiBox Detector</span> | 暂无讲解 | [📖 单词](/study/vocab/SSD_论文词汇.html) · [🎧 听力](/study/listen/SSD_听力.html) | [📝 笔记区](/paper-notes/SSD.html) | [📄 论文原文](https://arxiv.org/abs/1512.02325) |
| **YOLO v1** (2016)<br><span style="opacity:.72;font-size:.9em">You Only Look Once: Unified, Real-Time Object Detection</span> | 暂无讲解 | [📖 单词](/study/vocab/YOLO_论文词汇.html) · [🎧 听力](/study/listen/YOLO_听力.html) | [📝 笔记区](/paper-notes/YOLO.html) | [📄 论文原文](https://arxiv.org/abs/1506.02640) |
| **YOLOv2** (2017)<br><span style="opacity:.72;font-size:.9em">YOLO9000: Better, Faster, Stronger</span> | 暂无讲解 | [📖 单词](/study/vocab/YOLOv2_论文词汇.html) · [🎧 听力](/study/listen/YOLOv2_听力.html) | [📝 笔记区](/paper-notes/YOLOv2.html) | [📄 论文原文](https://arxiv.org/abs/1612.08242) |
| **YOLOv3** (2018)<br><span style="opacity:.72;font-size:.9em">YOLOv3: An Incremental Improvement</span> | 暂无讲解 | [📖 单词](/study/vocab/YOLOv3_论文词汇.html) · [🎧 听力](/study/listen/YOLOv3_听力.html) | [📝 笔记区](/paper-notes/YOLOv3.html) | [📄 论文原文](https://arxiv.org/abs/1804.02767) |
| **Mask R-CNN** (2017)<br><span style="opacity:.72;font-size:.9em">Mask R-CNN</span> | 暂无讲解 | [📖 单词](/study/vocab/MaskRCNN_论文词汇.html) · [🎧 听力](/study/listen/MaskRCNN_听力.html) | [📝 笔记区](/paper-notes/MaskRCNN.html) | [📄 论文原文](https://arxiv.org/abs/1703.06870) |
| **CenterNet** (2019)<br><span style="opacity:.72;font-size:.9em">Objects as Points</span> | 暂无讲解 | [📖 单词](/study/vocab/CenterNet_论文词汇.html) · [🎧 听力](/study/listen/CenterNet_听力.html) | [📝 笔记区](/paper-notes/CenterNet.html) | [📄 论文原文](https://arxiv.org/abs/1904.07850) |
| **DETR** (2020)<br><span style="opacity:.72;font-size:.9em">End-to-End Object Detection with Transformers</span> | [B站](https://www.bilibili.com/video/BV1GB4y1X72R/) | [📖 单词](/study/vocab/DETR_论文词汇.html) · [🎧 听力](/study/listen/DETR_听力.html) | [📝 笔记区](/paper-notes/DETR.html) | [📄 论文原文](https://arxiv.org/abs/2005.12872) |

## 视频理解

| 论文 | 视频讲解 | 词汇区 | 本站对照 | 论文原文 |
| -- | -- | -- | -- | -- |
| **TwoStream** (2014)<br><span style="opacity:.72;font-size:.9em">Two-Stream Convolutional Networks for Action Recognition in Videos</span> | [B站](https://www.bilibili.com/video/BV1mq4y1x7RU/) · [YouTube](https://youtu.be/vuqwKP2iDe0) | [📖 单词](/study/vocab/TwoStream_论文词汇.html) · [🎧 听力](/study/listen/TwoStream_听力.html) | [📝 笔记区](/paper-notes/TwoStream.html) | [📄 论文原文](https://arxiv.org/abs/1406.2199) |
| **C3D** (2015)<br><span style="opacity:.72;font-size:.9em">Learning Spatiotemporal Features with 3D Convolutional Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/C3D_论文词汇.html) · [🎧 听力](/study/listen/C3D_听力.html) | [📝 笔记区](/paper-notes/C3D.html) | [📄 论文原文](https://arxiv.org/abs/1412.0767) |
| **BeyondShortSnippets** (2015)<br><span style="opacity:.72;font-size:.9em">Beyond Short Snippets: Deep Networks for Video Classification</span> | [B站](https://www.bilibili.com/video/BV1fL4y157yA/) · [YouTube](https://youtu.be/gK7AGO6okhc) | [📖 单词](/study/vocab/BeyondShortSnippets_论文词汇.html) · [🎧 听力](/study/listen/BeyondShortSnippets_听力.html) | [📝 笔记区](/paper-notes/BeyondShortSnippets.html) | [📄 论文原文](https://arxiv.org/abs/1503.08909) |
| **TSN** (2016)<br><span style="opacity:.72;font-size:.9em">Temporal Segment Networks: Towards Good Practices for Deep Action Recognition</span> | 暂无讲解 | [📖 单词](/study/vocab/TSN_论文词汇.html) · [🎧 听力](/study/listen/TSN_听力.html) | [📝 笔记区](/paper-notes/TSN.html) | [📄 论文原文](https://arxiv.org/abs/1608.00859) |
| **NonLocal** (2018)<br><span style="opacity:.72;font-size:.9em">Non-local Neural Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/NonLocal_论文词汇.html) · [🎧 听力](/study/listen/NonLocal_听力.html) | [📝 笔记区](/paper-notes/NonLocal.html) | [📄 论文原文](https://arxiv.org/abs/1711.07971) |
| **R2plus1D** (2018)<br><span style="opacity:.72;font-size:.9em">A Closer Look at Spatiotemporal Convolutions for Action Recognition</span> | 暂无讲解 | [📖 单词](/study/vocab/R2plus1D_论文词汇.html) · [🎧 听力](/study/listen/R2plus1D_听力.html) | [📝 笔记区](/paper-notes/R2plus1D.html) | [📄 论文原文](https://arxiv.org/abs/1711.11248) |
| **ConvFusion** (2016)<br><span style="opacity:.72;font-size:.9em">Convolutional Two-Stream Network Fusion for Video Action Recognition</span> | 暂无讲解 | [📖 单词](/study/vocab/ConvFusion_论文词汇.html) · [🎧 听力](/study/listen/ConvFusion_听力.html) | [📝 笔记区](/paper-notes/ConvFusion.html) | [📄 论文原文](https://arxiv.org/abs/1604.06573) |
| **DeepVideo** (2014)<br><span style="opacity:.72;font-size:.9em">Large-Scale Video Classification with Convolutional Neural Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/DeepVideo_论文词汇.html) · [🎧 听力](/study/listen/DeepVideo_听力.html) | [📝 笔记区](/paper-notes/DeepVideo.html) | [📄 论文原文](https://cs.stanford.edu/people/karpathy/deepvideo/deepvideo_cvpr2014.pdf) |
| **视频理解综述** (2022)<br><span style="opacity:.72;font-size:.9em">A Comprehensive Survey of Deep Video Action Recognition</span> | 暂无讲解 | [📖 单词](/study/vocab/视频理解综述_论文词汇.html) · [🎧 听力](/study/listen/视频理解综述_听力.html) | [📝 笔记区](/paper-notes/视频理解综述.html) | [📄 论文原文](https://arxiv.org/abs/2012.06567) |
| **i3d** (2017)<br><span style="opacity:.72;font-size:.9em">Quo Vadis, Action Recognition? A New Model and the Kinetics Dataset</span> | [B站](https://www.bilibili.com/video/BV1tY4y1p7hq/) · [YouTube](https://youtu.be/9lIkKiAn6uE) | [📖 单词](/study/vocab/I3D_论文词汇.html) · [🎧 听力](/study/listen/I3D_听力.html) | [📝 笔记区](/paper-notes/I3D.html) | [📄 论文原文](https://arxiv.org/abs/1705.07750) |
| **slowfast** (2019)<br><span style="opacity:.72;font-size:.9em">SlowFast Networks for Video Recognition</span> | 暂无讲解 | [📖 单词](/study/vocab/SlowFast_论文词汇.html) · [🎧 听力](/study/listen/SlowFast_听力.html) | [📝 笔记区](/paper-notes/SlowFast.html) | [📄 论文原文](https://arxiv.org/abs/1812.03982) |
| **TimeSformer** (2021)<br><span style="opacity:.72;font-size:.9em">Is Space-Time Attention All You Need for Video Understanding?</span> | 暂无讲解 | [📖 单词](/study/vocab/TimeSformer_论文词汇.html) · [🎧 听力](/study/listen/TimeSformer_听力.html) | [📝 笔记区](/paper-notes/TimeSformer.html) | [📄 论文原文](https://arxiv.org/abs/2102.05095) |

## 生成模型

| 论文 | 视频讲解 | 词汇区 | 本站对照 | 论文原文 |
| -- | -- | -- | -- | -- |
| **WGAN** (2017)<br><span style="opacity:.72;font-size:.9em">Wasserstein GAN</span> | 暂无讲解 | [📖 单词](/study/vocab/WGAN_论文词汇.html) · [🎧 听力](/study/listen/WGAN_听力.html) | [📝 笔记区](/paper-notes/WGAN.html) | [📄 论文原文](https://arxiv.org/abs/1701.07875) |
| **CycleGAN** (2017)<br><span style="opacity:.72;font-size:.9em">Unpaired Image-to-Image Translation Using Cycle-Consistent Adversarial Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/CycleGAN_论文词汇.html) · [🎧 听力](/study/listen/CycleGAN_听力.html) | [📝 笔记区](/paper-notes/CycleGAN.html) | [📄 论文原文](https://arxiv.org/abs/1703.10593) |
| **SRGAN** (2017)<br><span style="opacity:.72;font-size:.9em">Photo-Realistic Single Image Super-Resolution Using a Generative Adversarial Network</span> | 暂无讲解 | [📖 单词](/study/vocab/SRGAN_论文词汇.html) · [🎧 听力](/study/listen/SRGAN_听力.html) | [📝 笔记区](/paper-notes/SRGAN.html) | [📄 论文原文](https://arxiv.org/abs/1609.04802) |
| **pix2pix** (2017)<br><span style="opacity:.72;font-size:.9em">Image-to-Image Translation with Conditional Adversarial Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/pix2pix_论文词汇.html) · [🎧 听力](/study/listen/pix2pix_听力.html) | [📝 笔记区](/paper-notes/pix2pix.html) | [📄 论文原文](https://arxiv.org/abs/1611.07004) |
| **StyleGAN2** (2020)<br><span style="opacity:.72;font-size:.9em">Analyzing and Improving the Image Quality of StyleGAN</span> | 暂无讲解 | [📖 单词](/study/vocab/StyleGAN2_论文词汇.html) · [🎧 听力](/study/listen/StyleGAN2_听力.html) | [📝 笔记区](/paper-notes/StyleGAN2.html) | [📄 论文原文](https://arxiv.org/abs/1912.04958) |
| **StyleGAN3** (2021)<br><span style="opacity:.72;font-size:.9em">Alias-Free Generative Adversarial Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/StyleGAN3_论文词汇.html) · [🎧 听力](/study/listen/StyleGAN3_听力.html) | [📝 笔记区](/paper-notes/StyleGAN3.html) | [📄 论文原文](https://arxiv.org/abs/2106.12423) |
| **Improved DDPM** (2021)<br><span style="opacity:.72;font-size:.9em">Improved Denoising Diffusion Probabilistic Models</span> | 暂无讲解 | [📖 单词](/study/vocab/ImprovedDDPM_论文词汇.html) · [🎧 听力](/study/listen/ImprovedDDPM_听力.html) | [📝 笔记区](/paper-notes/ImprovedDDPM.html) | [📄 论文原文](https://arxiv.org/abs/2102.09672) |
| **Guided Diffusion** (2021)<br><span style="opacity:.72;font-size:.9em">Diffusion Models Beat GANs on Image Synthesis</span> | 暂无讲解 | [📖 单词](/study/vocab/GuidedDiffusion_论文词汇.html) · [🎧 听力](/study/listen/GuidedDiffusion_听力.html) | [📝 笔记区](/paper-notes/GuidedDiffusion.html) | [📄 论文原文](https://arxiv.org/abs/2105.05233) |
| **GAN** (2014)<br><span style="opacity:.72;font-size:.9em">Generative Adversarial Networks</span> | [B站](https://www.bilibili.com/video/BV1rb4y187vD/) · [YouTube](https://www.youtube.com/watch?v=g_0HtlrLiDo) · [知乎](https://www.zhihu.com/zvideo/1442091389241159681) | [📖 单词](/study/vocab/GAN_论文词汇.html) · [🎧 听力](/study/listen/GAN_听力.html) | [📝 笔记区](/paper-notes/GAN.html) | [📄 论文原文](https://arxiv.org/abs/1406.2661) |
| **dcgan** (2016)<br><span style="opacity:.72;font-size:.9em">Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/DCGAN_论文词汇.html) · [🎧 听力](/study/listen/DCGAN_听力.html) | [📝 笔记区](/paper-notes/DCGAN.html) | [📄 论文原文](https://arxiv.org/abs/1511.06434) |
| **ddpm** (2020)<br><span style="opacity:.72;font-size:.9em">Denoising Diffusion Probabilistic Models</span> | 暂无讲解 | [📖 单词](/study/vocab/DDPM_论文词汇.html) · [🎧 听力](/study/listen/DDPM_听力.html) | [📝 笔记区](/paper-notes/DDPM.html) | [📄 论文原文](https://arxiv.org/abs/2006.11239) |
| **DALL·E 2** (2022)<br><span style="opacity:.72;font-size:.9em">Hierarchical Text-Conditional Image Generation with CLIP Latents</span> | [B站](https://www.bilibili.com/video/BV17r4y1u77B) · [YouTube](https://youtu.be/hO57mntSMl0) | [📖 单词](/study/vocab/DALLE2_论文词汇.html) · [🎧 听力](/study/listen/DALLE2_听力.html) | [📝 笔记区](/paper-notes/DALLE2.html) | [📄 论文原文](https://arxiv.org/abs/2204.06125) |
| **StyleGAN** (2019)<br><span style="opacity:.72;font-size:.9em">A Style-Based Generator Architecture for Generative Adversarial Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/StyleGAN_论文词汇.html) · [🎧 听力](/study/listen/StyleGAN_听力.html) | [📝 笔记区](/paper-notes/StyleGAN.html) | [📄 论文原文](https://arxiv.org/abs/1812.04948) |

## 对比学习

| 论文 | 视频讲解 | 词汇区 | 本站对照 | 论文原文 |
| -- | -- | -- | -- | -- |
| **CPC** (2018)<br><span style="opacity:.72;font-size:.9em">Representation Learning with Contrastive Predictive Coding</span> | 暂无讲解 | [📖 单词](/study/vocab/CPC_论文词汇.html) · [🎧 听力](/study/listen/CPC_听力.html) | [📝 笔记区](/paper-notes/CPC.html) | [📄 论文原文](https://arxiv.org/abs/1807.03748) |
| **CMC** (2020)<br><span style="opacity:.72;font-size:.9em">Contrastive Multiview Coding</span> | 暂无讲解 | [📖 单词](/study/vocab/CMC_论文词汇.html) · [🎧 听力](/study/listen/CMC_听力.html) | [📝 笔记区](/paper-notes/CMC.html) | [📄 论文原文](https://arxiv.org/abs/1906.05849) |
| **InstDisc** (2018)<br><span style="opacity:.72;font-size:.9em">Unsupervised Feature Learning via Non-Parametric Instance Discrimination</span> | 暂无讲解 | [📖 单词](/study/vocab/InstDisc_论文词汇.html) · [🎧 听力](/study/listen/InstDisc_听力.html) | [📝 笔记区](/paper-notes/InstDisc.html) | [📄 论文原文](https://arxiv.org/abs/1805.01978) |
| **InvaSpread** (2019)<br><span style="opacity:.72;font-size:.9em">Unsupervised Embedding Learning via Invariant and Spreading Instance Feature</span> | 暂无讲解 | [📖 单词](/study/vocab/InvaSpread_论文词汇.html) · [🎧 听力](/study/listen/InvaSpread_听力.html) | [📝 笔记区](/paper-notes/InvaSpread.html) | [📄 论文原文](https://arxiv.org/abs/1904.03436) |
| **SimCLRv2** (2020)<br><span style="opacity:.72;font-size:.9em">Big Self-Supervised Models are Strong Semi-Supervised Learners</span> | 暂无讲解 | [📖 单词](/study/vocab/SimCLRv2_论文词汇.html) · [🎧 听力](/study/listen/SimCLRv2_听力.html) | [📝 笔记区](/paper-notes/SimCLRv2.html) | [📄 论文原文](https://arxiv.org/abs/2006.10029) |
| **MoCo v2** (2020)<br><span style="opacity:.72;font-size:.9em">Improved Baselines with Momentum Contrastive Learning</span> | 暂无讲解 | [📖 单词](/study/vocab/MoCov2_论文词汇.html) · [🎧 听力](/study/listen/MoCov2_听力.html) | [📝 笔记区](/paper-notes/MoCov2.html) | [📄 论文原文](https://arxiv.org/abs/2003.04297) |
| **MoCo v3** (2021)<br><span style="opacity:.72;font-size:.9em">An Empirical Study of Training Self-Supervised Vision Transformers</span> | 暂无讲解 | [📖 单词](/study/vocab/MoCov3_论文词汇.html) · [🎧 听力](/study/listen/MoCov3_听力.html) | [📝 笔记区](/paper-notes/MoCov3.html) | [📄 论文原文](https://arxiv.org/abs/2104.02057) |
| **SWaV** (2020)<br><span style="opacity:.72;font-size:.9em">Unsupervised Learning of Visual Features by Contrasting Cluster Assignments</span> | 暂无讲解 | [📖 单词](/study/vocab/SWaV_论文词汇.html) · [🎧 听力](/study/listen/SWaV_听力.html) | [📝 笔记区](/paper-notes/SWaV.html) | [📄 论文原文](https://arxiv.org/abs/2006.09882) |
| **SimSiam** (2021)<br><span style="opacity:.72;font-size:.9em">Exploring Simple Siamese Representation Learning</span> | 暂无讲解 | [📖 单词](/study/vocab/SimSiam_论文词汇.html) · [🎧 听力](/study/listen/SimSiam_听力.html) | [📝 笔记区](/paper-notes/SimSiam.html) | [📄 论文原文](https://arxiv.org/abs/2011.10566) |
| **SimCLRv1** (2020)<br><span style="opacity:.72;font-size:.9em">A Simple Framework for Contrastive Learning of Visual Representations</span> | 暂无讲解 | [📖 单词](/study/vocab/SimCLRv1_论文词汇.html) · [🎧 听力](/study/listen/SimCLRv1_听力.html) | [📝 笔记区](/paper-notes/SimCLRv1.html) | [📄 论文原文](https://arxiv.org/abs/2002.05709) |
| **byol** (2020)<br><span style="opacity:.72;font-size:.9em">Bootstrap Your Own Latent: A New Approach to Self-Supervised Learning</span> | 暂无讲解 | [📖 单词](/study/vocab/BYOL_论文词汇.html) · [🎧 听力](/study/listen/BYOL_听力.html) | [📝 笔记区](/paper-notes/BYOL.html) | [📄 论文原文](https://arxiv.org/abs/2006.07733) |
| **MoCo** (2020)<br><span style="opacity:.72;font-size:.9em">Momentum Contrast for Unsupervised Visual Representation Learning</span> | [B站](https://www.bilibili.com/video/BV1C3411s7t9/) · [YouTube](https://www.youtube.com/watch?v=1pvxufGRuW4) · [知乎](https://www.zhihu.com/zvideo/1454723120678936576) | [📖 单词](/study/vocab/MoCo_论文词汇.html) · [🎧 听力](/study/listen/MoCo_听力.html) | [📝 笔记区](/paper-notes/MoCo.html) | [📄 论文原文](https://arxiv.org/abs/1911.05722) |
| **dino** (2021)<br><span style="opacity:.72;font-size:.9em">Emerging Properties in Self-Supervised Vision Transformers</span> | 暂无讲解 | [📖 单词](/study/vocab/DINO_论文词汇.html) · [🎧 听力](/study/listen/DINO_听力.html) | [📝 笔记区](/paper-notes/DINO.html) | [📄 论文原文](https://arxiv.org/abs/2104.14294) |

## CNN 系列

| 论文 | 视频讲解 | 词汇区 | 本站对照 | 论文原文 |
| -- | -- | -- | -- | -- |
| **ResNet** (2016)<br><span style="opacity:.72;font-size:.9em">Deep Residual Learning for Image Recognition</span> | [B站](https://www.bilibili.com/video/BV1P3411y7nn/) · [YouTube](https://www.youtube.com/watch?v=pWMnzCX4cwQ) · [知乎](https://www.zhihu.com/zvideo/1434795406001180672) | [📖 单词](/study/vocab/ResNet_论文词汇.html) · [🎧 听力](/study/listen/ResNet_听力.html) | [📝 笔记区](/paper-notes/ResNet.html) | [📄 论文原文](https://arxiv.org/abs/1512.03385) |
| **EfficientNet** (2019)<br><span style="opacity:.72;font-size:.9em">EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/EfficientNet_论文词汇.html) · [🎧 听力](/study/listen/EfficientNet_听力.html) | [📝 笔记区](/paper-notes/EfficientNet.html) | [📄 论文原文](https://arxiv.org/abs/1905.11946) |
| **MobileNet** (2017)<br><span style="opacity:.72;font-size:.9em">MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications</span> | 暂无讲解 | [📖 单词](/study/vocab/MobileNet_论文词汇.html) · [🎧 听力](/study/listen/MobileNet_听力.html) | [📝 笔记区](/paper-notes/MobileNet.html) | [📄 论文原文](https://arxiv.org/abs/1704.04861) |
| **NonDeepNetworks** (2022)<br><span style="opacity:.72;font-size:.9em">Non-deep Networks</span> | 暂无讲解 | [📖 单词](/study/vocab/NonDeepNetworks_论文词汇.html) · [🎧 听力](/study/listen/NonDeepNetworks_听力.html) | [📝 笔记区](/paper-notes/NonDeepNetworks.html) | [📄 论文原文](https://arxiv.org/abs/2110.07641) |
| **MLPMixer** (2021)<br><span style="opacity:.72;font-size:.9em">MLP-Mixer: An all-MLP Architecture for Vision</span> | 暂无讲解 | [📖 单词](/study/vocab/MLPMixer_论文词汇.html) · [🎧 听力](/study/listen/MLPMixer_听力.html) | [📝 笔记区](/paper-notes/MLPMixer.html) | [📄 论文原文](https://arxiv.org/abs/2105.01601) |
| **AlexNet** (2012)<br><span style="opacity:.72;font-size:.9em">ImageNet Classification with Deep Convolutional Neural Networks</span> | [B站](https://www.bilibili.com/video/BV1hq4y157t1/) · [YouTube](https://www.youtube.com/watch?v=wYmlILPsLlY) · [知乎](https://www.zhihu.com/zvideo/1432354207483871232) | [📖 单词](/study/vocab/AlexNet_论文词汇.html) · [🎧 听力](/study/listen/AlexNet_听力.html) | [📝 笔记区](/paper-notes/AlexNet.html) | [📄 论文原文](https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html) |
| **VGG** (2014)<br><span style="opacity:.72;font-size:.9em">Very Deep Convolutional Networks for Large-Scale Image Recognition</span> | 暂无讲解 | [📖 单词](/study/vocab/VGG_论文词汇.html) · [🎧 听力](/study/listen/VGG_听力.html) | [📝 笔记区](/paper-notes/VGG.html) | [📄 论文原文](https://arxiv.org/abs/1409.1556) |
| **GoogleNet** (2015)<br><span style="opacity:.72;font-size:.9em">Going Deeper with Convolutions</span> | 暂无讲解 | [📖 单词](/study/vocab/GoogleNet_论文词汇.html) · [🎧 听力](/study/listen/GoogleNet_听力.html) | [📝 笔记区](/paper-notes/GoogleNet.html) | [📄 论文原文](https://arxiv.org/abs/1409.4842) |

## 多模态 CLIP 系

| 论文 | 视频讲解 | 词汇区 | 本站对照 | 论文原文 |
| -- | -- | -- | -- | -- |
| **ViLT** (2021)<br><span style="opacity:.72;font-size:.9em">ViLT: Vision-and-Language Transformer Without Convolution or Region Supervision</span> | [B站](https://www.bilibili.com/video/BV14r4y1j74y) · [YouTube](https://youtu.be/ug8YvZOjOCE) | [📖 单词](/study/vocab/ViLT_论文词汇.html) · [🎧 听力](/study/listen/ViLT_听力.html) | [📝 笔记区](/paper-notes/ViLT.html) | [📄 论文原文](https://arxiv.org/abs/2102.03334) |
| **ActionCLIP** (2021)<br><span style="opacity:.72;font-size:.9em">ActionCLIP: A New Paradigm for Action Recognition</span> | 暂无讲解 | [📖 单词](/study/vocab/ActionCLIP_论文词汇.html) · [🎧 听力](/study/listen/ActionCLIP_听力.html) | [📝 笔记区](/paper-notes/ActionCLIP.html) | [📄 论文原文](https://arxiv.org/abs/2109.08472) |
| **CLIP4Clip** (2021)<br><span style="opacity:.72;font-size:.9em">CLIP4Clip: An Empirical Study of CLIP for End to End Video Clip Retrieval</span> | [B站](https://www.bilibili.com/video/BV1FV4y1p7Lm) · [YouTube](https://youtu.be/x4CDhZz_Dvg) | [📖 单词](/study/vocab/CLIP4Clip_论文词汇.html) · [🎧 听力](/study/listen/CLIP4Clip_听力.html) | [📝 笔记区](/paper-notes/CLIP4Clip.html) | [📄 论文原文](https://arxiv.org/abs/2104.08860) |
| **CLIPasso** (2022)<br><span style="opacity:.72;font-size:.9em">CLIPasso: Semantically-Aware Object Sketching</span> | 暂无讲解 | [📖 单词](/study/vocab/CLIPasso_论文词汇.html) · [🎧 听力](/study/listen/CLIPasso_听力.html) | [📝 笔记区](/paper-notes/CLIPasso.html) | [📄 论文原文](https://arxiv.org/abs/2202.05822) |
| **DepthCLIP** (2022)<br><span style="opacity:.72;font-size:.9em">DepthCLIP: Exploiting CLIP for Zero-Shot Monocular Depth Estimation</span> | 暂无讲解 | [📖 单词](/study/vocab/DepthCLIP_论文词汇.html) · [🎧 听力](/study/listen/DepthCLIP_听力.html) | [📝 笔记区](/paper-notes/DepthCLIP.html) | [📄 论文原文](https://arxiv.org/abs/2207.01077) |
| **GLIP** (2022)<br><span style="opacity:.72;font-size:.9em">Grounded Language-Image Pre-training</span> | 暂无讲解 | [📖 单词](/study/vocab/GLIP_论文词汇.html) · [🎧 听力](/study/listen/GLIP_听力.html) | [📝 笔记区](/paper-notes/GLIP.html) | [📄 论文原文](https://arxiv.org/abs/2112.03857) |
| **GroupViT** (2022)<br><span style="opacity:.72;font-size:.9em">GroupViT: Semantic Segmentation Emerges from Text Supervision</span> | 暂无讲解 | [📖 单词](/study/vocab/GroupViT_论文词汇.html) · [🎧 听力](/study/listen/GroupViT_听力.html) | [📝 笔记区](/paper-notes/GroupViT.html) | [📄 论文原文](https://arxiv.org/abs/2202.11094) |
| **LSeg** (2022)<br><span style="opacity:.72;font-size:.9em">Language-driven Semantic Image Segmentation</span> | 暂无讲解 | [📖 单词](/study/vocab/LSeg_论文词汇.html) · [🎧 听力](/study/listen/LSeg_听力.html) | [📝 笔记区](/paper-notes/LSeg.html) | [📄 论文原文](https://arxiv.org/abs/2201.03546) |
| **PointCLIP** (2022)<br><span style="opacity:.72;font-size:.9em">PointCLIP: Point Cloud Understanding by CLIP</span> | 暂无讲解 | [📖 单词](/study/vocab/PointCLIP_论文词汇.html) · [🎧 听力](/study/listen/PointCLIP_听力.html) | [📝 笔记区](/paper-notes/PointCLIP.html) | [📄 论文原文](https://arxiv.org/abs/2112.02413) |
| **ViLD** (2022)<br><span style="opacity:.72;font-size:.9em">Open-Vocabulary Object Detection via Vision and Language Knowledge Distillation</span> | 暂无讲解 | [📖 单词](/study/vocab/ViLD_论文词汇.html) · [🎧 听力](/study/listen/ViLD_听力.html) | [📝 笔记区](/paper-notes/ViLD.html) | [📄 论文原文](https://arxiv.org/abs/2104.13921) |
| **clip** (2021)<br><span style="opacity:.72;font-size:.9em">Learning Transferable Visual Models From Natural Language Supervision</span> | [B站](https://www.bilibili.com/video/BV1SL4y1s7LQ/) · [YouTube](https://youtu.be/OZF1t_Hieq8) · [知乎](https://www.zhihu.com/zvideo/1475706654562299904) | [📖 单词](/study/vocab/CLIP_论文词汇.html) · [🎧 听力](/study/listen/CLIP_听力.html) | [📝 笔记区](/paper-notes/CLIP.html) | [📄 论文原文](https://arxiv.org/abs/2103.00020) |

## 系统与分布式

| 论文 | 视频讲解 | 词汇区 | 本站对照 | 论文原文 |
| -- | -- | -- | -- | -- |
| **GPipe** (2019)<br><span style="opacity:.72;font-size:.9em">GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism</span> | [B站](https://www.bilibili.com/video/BV1v34y1E7zu/) · [YouTube](https://youtu.be/eXjRpS_BTbs) | [📖 单词](/study/vocab/GPipe_论文词汇.html) · [🎧 听力](/study/listen/GPipe_听力.html) | [📝 笔记区](/paper-notes/GPipe.html) | [📄 论文原文](https://arxiv.org/abs/1811.06965) |
| **MegatronLM** (2019)<br><span style="opacity:.72;font-size:.9em">Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism</span> | [B站](https://www.bilibili.com/video/BV1nB4y1R7Yz/) | [📖 单词](/study/vocab/MegatronLM_论文词汇.html) · [🎧 听力](/study/listen/MegatronLM_听力.html) | [📝 笔记区](/paper-notes/MegatronLM.html) | [📄 论文原文](https://arxiv.org/abs/1909.08053) |
| **ParameterServer** (2014)<br><span style="opacity:.72;font-size:.9em">Scaling Distributed Machine Learning with the Parameter Server</span> | [B站](https://www.bilibili.com/video/BV1YA4y197G8/) · [YouTube](https://youtu.be/xt-AwUrDxQk) | [📖 单词](/study/vocab/ParameterServer_论文词汇.html) · [🎧 听力](/study/listen/ParameterServer_听力.html) | [📝 笔记区](/paper-notes/ParameterServer.html) | [📄 论文原文](https://www.usenix.org/conference/osdi14/technical-sessions/presentation/li_mu) |
| **Pathways** (2022)<br><span style="opacity:.72;font-size:.9em">Pathways: Asynchronous Distributed Dataflow for ML</span> | [B站](https://www.bilibili.com/video/BV1xB4y1m7Xi/) · [YouTube](https://youtu.be/8hS1ZtgG0wU) | [📖 单词](/study/vocab/Pathways_论文词汇.html) · [🎧 听力](/study/listen/Pathways_听力.html) | [📝 笔记区](/paper-notes/Pathways.html) | [📄 论文原文](https://arxiv.org/abs/2203.12533) |

## AI for Science 与视频生成

| 论文 | 视频讲解 | 词汇区 | 本站对照 | 论文原文 |
| -- | -- | -- | -- | -- |
| **AlphaGo** (2016)<br><span style="opacity:.72;font-size:.9em">Mastering the Game of Go with Deep Neural Networks and Tree Search</span> | 暂无讲解 | [📖 单词](/study/vocab/AlphaGo_论文词汇.html) · [🎧 听力](/study/listen/AlphaGo_听力.html) | [📝 笔记区](/paper-notes/AlphaGo.html) | [📄 论文原文](https://www.nature.com/articles/nature16961) |
| **AlphaFold** (2020)<br><span style="opacity:.72;font-size:.9em">AlphaFold: Improved Protein Structure Prediction Using Potentials from Deep Learning</span> | [B站](https://www.bilibili.com/video/BV1oR4y1K7Xr/) · [YouTube](https://youtu.be/Oy3OCoGUr-w) · [知乎](https://www.zhihu.com/zvideo/1469132410537717760) | [📖 单词](/study/vocab/AlphaFold_论文词汇.html) · [🎧 听力](/study/listen/AlphaFold_听力.html) | [📝 笔记区](/paper-notes/AlphaFold.html) | [📄 论文原文](https://www.nature.com/articles/s41586-019-1923-7) |
| **AlphaFold 2** (2021)<br><span style="opacity:.72;font-size:.9em">Highly Accurate Protein Structure Prediction with AlphaFold</span> | [B站](https://www.bilibili.com/video/BV1oR4y1K7Xr/) · [YouTube](https://youtu.be/Oy3OCoGUr-w) · [知乎](https://www.zhihu.com/zvideo/1469132410537717760) | [📖 单词](/study/vocab/AlphaFold2_论文词汇.html) · [🎧 听力](/study/listen/AlphaFold2_听力.html) | [📝 笔记区](/paper-notes/AlphaFold2.html) | [📄 论文原文](https://www.nature.com/articles/s41586-021-03819-2) |
| **MovieGen** (2024)<br><span style="opacity:.72;font-size:.9em">Movie Gen: A Cast of Media Foundation Models</span> | [B站](https://www.bilibili.com/video/BV1VdcxesEAt/) · [YouTube](https://youtu.be/5MGq7dSOghY?si=lY-OsadDsTeKf-ub) | [📖 单词](/study/vocab/MovieGen_论文词汇.html) · [🎧 听力](/study/listen/MovieGen_听力.html) | [📝 笔记区](/paper-notes/MovieGen.html) | [📄 论文原文](https://arxiv.org/abs/2410.13720) |
| **HunyuanVideo** (2024)<br><span style="opacity:.72;font-size:.9em">HunyuanVideo: A Systematic Framework for Large Video Generative Models</span> | [B站](https://www.bilibili.com/video/BV1VdcxesEAt/) · [YouTube](https://youtu.be/5MGq7dSOghY?si=lY-OsadDsTeKf-ub) | [📖 单词](/study/vocab/HunyuanVideo_论文词汇.html) · [🎧 听力](/study/listen/HunyuanVideo_听力.html) | [📝 笔记区](/paper-notes/HunyuanVideo.html) | [📄 论文原文](https://arxiv.org/abs/2412.03603) |
| **sora** (2024)<br><span style="opacity:.72;font-size:.9em">Video Generation Models as World Simulators</span> | [B站](https://www.bilibili.com/video/BV1VdcxesEAt/) · [YouTube](https://youtu.be/5MGq7dSOghY?si=lY-OsadDsTeKf-ub) | [📖 单词](/study/vocab/Sora_论文词汇.html) · [🎧 听力](/study/listen/Sora_听力.html) | [📝 笔记区](/paper-notes/Sora.html) | [📄 论文原文](https://openai.com/index/video-generation-models-as-world-simulators/) |

## 视觉 Transformer

| 论文 | 视频讲解 | 词汇区 | 本站对照 | 论文原文 |
| -- | -- | -- | -- | -- |
| **ViT** (2021)<br><span style="opacity:.72;font-size:.9em">An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale</span> | [B站](https://www.bilibili.com/video/BV15P4y137jb/) · [YouTube](https://youtu.be/FRFt3x0bO94) · [知乎](https://www.zhihu.com/zvideo/1449195245754380288) | [📖 单词](/study/vocab/ViT_论文词汇.html) · [🎧 听力](/study/listen/ViT_听力.html) | [📝 笔记区](/paper-notes/ViT.html) | [📄 论文原文](https://arxiv.org/abs/2010.11929) |
| **Swin Transformer** (2021)<br><span style="opacity:.72;font-size:.9em">Swin Transformer: Hierarchical Vision Transformer using Shifted Windows</span> | [B站](https://www.bilibili.com/video/BV13L4y1475U/) · [YouTube](https://youtu.be/luP3-Fs0QCo) · [知乎](https://www.zhihu.com/zvideo/1466282983652691968) | [📖 单词](/study/vocab/SwinTransformer_论文词汇.html) · [🎧 听力](/study/listen/SwinTransformer_听力.html) | [📝 笔记区](/paper-notes/SwinTransformer.html) | [📄 论文原文](https://arxiv.org/abs/2103.14030) |
| **MAE** (2022)<br><span style="opacity:.72;font-size:.9em">Masked Autoencoders Are Scalable Vision Learners</span> | [B站](https://www.bilibili.com/video/BV1sq4y1q77t/) · [YouTube](https://youtu.be/mYlX2dpdHHM) · [知乎](https://www.zhihu.com/zvideo/1452458167968251904) | [📖 单词](/study/vocab/MAE_论文词汇.html) · [🎧 听力](/study/listen/MAE_听力.html) | [📝 笔记区](/paper-notes/MAE.html) | [📄 论文原文](https://arxiv.org/abs/2111.06377) |

## 科研方法 · 杂谈（李沐非论文讲解）

| 讲解内容 | 视频 |
| -- | -- |
| Llama 3.1论文精读 · 5. 模型训练过程 | [B站](https://www.bilibili.com/video/BV1c8HbeaEXi) |
| Llama 3.1论文精读 · 4. 训练infra | [B站](https://www.bilibili.com/video/BV1b4421f7fa) · [YouTube](https://www.youtube.com/watch?v=6XidEHVjS1A) |
| Llama 3.1论文精读 · 3. 模型 | [B站](https://www.bilibili.com/video/BV1Q4421Z7Tj) · [YouTube](https://www.youtube.com/watch?v=G6gF-5g1Gg4) |
| Llama 3.1论文精读 · 2. 预训练数据 | [B站](https://www.bilibili.com/video/BV1u142187S5) · [YouTube](https://www.youtube.com/watch?v=wXFr3zIE8FM) |
| 大模型时代下做科研的四个思路 | [B站](https://www.bilibili.com/video/BV1oX4y1d7X6) · [YouTube](https://youtu.be/sh79Z8i15PI) |
| 多模态论文串讲·下 | [B站](https://www.bilibili.com/video/BV1fA411Z772) · [YouTube](https://youtu.be/S1le41J76lQ) |
| Neural Corpus Indexer 文档检索 | [B站](https://www.bilibili.com/video/BV1Se411w7Sn) · [YouTube](https://youtu.be/QRffZMSGJyU) |
| 多模态论文串讲·上 | [B站](https://www.bilibili.com/video/BV1Vd4y1v77v) · [YouTube](https://youtu.be/6pzBOQAXUB8) |
| 在讲 OpenAI Whisper 前先做了一个剪视频小工具 | [B站](https://www.bilibili.com/video/BV1Pe4y1t7de) · [YouTube](https://youtu.be/PwVlvCPDnrI) |
| CLIP 改进工作串讲（下） | [B站](https://www.bilibili.com/video/BV1gg411U7n4) · [YouTube](https://youtu.be/ugJeBivv65s) |
| 理由、论据和担保【研究的艺术·四】 | [B站](https://www.bilibili.com/video/BV1SB4y1a75c) |
| 如何讲好故事、故事里的论点【研究的艺术·三】 | [B站](https://www.bilibili.com/video/BV1WB4y1v7ST) |
| 明白问题的重要性【研究的艺术·二】 | [B站](https://www.bilibili.com/video/BV11S4y1v7S2/) |
| 跟读者建立联系【研究的艺术·一】 | [B站](https://www.bilibili.com/video/BV1hY411T7vy/) |
| 视频理解论文串讲（下） | [B站](https://www.bilibili.com/video/BV11Y411P7ep/) · [YouTube](https://youtu.be/J2YC0-k57NM) |
| 斯坦福 2022 年 AI 指数报告 精读 | [B站](https://www.bilibili.com/video/BV1s44y1N7eu/) · [YouTube](https://youtu.be/K8h_xjQ6ufY) |
| 你（被）吐槽过论文不够 novel 吗？ | [B站](https://www.bilibili.com/video/BV1ea41127Bq/) · [知乎](https://www.zhihu.com/zvideo/1475719090198876161) |
| 如何判断（你自己的）研究工作的价值 | [B站](https://www.bilibili.com/video/BV1oL411c7Us/) · [知乎](https://www.zhihu.com/zvideo/1475716940051869696) |
| 指导数学直觉 | [B站](https://www.bilibili.com/video/BV1YZ4y1S72j/) · [YouTube](https://youtu.be/czFGjvhtss8) · [知乎](https://www.zhihu.com/zvideo/1464060386375299072) |
| AlphaFold 2 预告 | [B站](https://www.bilibili.com/video/BV1Eu411U7Te/) |
| 对比学习论文综述 | [B站](https://www.bilibili.com/video/BV19S4y1M7hm/) · [YouTube](https://www.youtube.com/watch?v=1pvxufGRuW4) · [知乎](https://www.zhihu.com/zvideo/1460828005077164032) |
| 如何找研究想法 1 | [B站](https://www.bilibili.com/video/BV1qq4y1z7F2/) |
| 零基础多图详解 图神经网络（GNN/GCN） | [B站](https://www.bilibili.com/video/BV1iT4y1d7zP/) · [YouTube](https://youtu.be/sejA2PtCITw) · [知乎](https://www.zhihu.com/zvideo/1439540657619087360) |
| 撑起计算机视觉半边天的 ResNet | [B站](https://www.bilibili.com/video/BV1Fb4y1h73E/) · [YouTube](https://www.youtube.com/watch?v=NnSldWhSqvY) · [知乎](https://www.zhihu.com/zvideo/1434787226101751808) |
| 9年后重读深度学习奠基作之一：AlexNet | [B站](https://www.bilibili.com/video/BV1ih411J7Kz/) · [YouTube](https://www.youtube.com/watch?v=vdYH0fE6thY) · [知乎](https://www.zhihu.com/zvideo/1432155856322920448) |
| 如何读论文 | [B站](https://www.bilibili.com/video/BV1H44y1t75x/) · [YouTube](https://www.youtube.com/watch?v=txjl_Q4jCyQ&list=PLFXJ6jwg0qW-7UM8iUTj3qKqdhbQULP5I&index=1) · [知乎](https://www.zhihu.com/zvideo/1428973951632969728) |

## 阅读顺序建议

如果一篇论文你没读过，建议按 <b>词表 → 听力 → 朗读 → 讲解</b> 的顺序走：先扫掉生词，再用听力把发音和术语过一遍耳朵，然后跟着朗读视频把原文读顺，最后听讲解确认自己理解的方向对不对。

反过来，如果你已经熟悉这篇论文，直接进讲解区即可。
